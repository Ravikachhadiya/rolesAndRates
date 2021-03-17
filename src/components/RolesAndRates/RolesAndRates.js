import React, { useState, useEffect } from 'react';

import classes from './RolesAndRates.module.css';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as crudAction from '../../storeUtils/actions/crudAction';
import * as componentAction from '../../storeUtils/actions/componentActions';

import RolesAndRatesData from '../RolesAndRatesData/RolesAndRatesData';
import AddRole from '../AddRole/AddRole';
import Modal from '../../UI/Modal/Modal';
import DeleteConformation from '../DeleteConformation/DeleteConformation';

const RolesAndRates = (props) => {
    const [addRole, setAddRole] = useState(false);
    const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletingRoleId, setDeletingRoleId] = useState(0);
    const [newRole, setNewRole] = useState(false);

    const showDeleteConfirmToggler = (value) => {
        setShowDeleteConfirm(value);
    }


    // useEffect(() => {
    //     console.log(addRole);
    // }, [addRole]);

    const addRoleToggler = (value) => {
        setAddRole(value);
    }

    useEffect(() => {
        props.actions.postAll('getrolesbycurrentdate/7', pageInfo, "rolesList");
    }, [pageInfo, props.addRoleDetails, props.updateRoleDetails, props.deleteRole]);

    useEffect(() => {
        //console.log(props.addRoleDetails);
        if (props.addRoleDetails !== undefined) {
            if (props.addRoleDetails.success !== false) {
                // props.actions.reset('addRoleDetails');
                setAddRole(false);
            }
            else {
            }
        }
    }, [props.addRoleDetails]);

    useEffect(() => {
        if (props.updateRoleDetails !== undefined) {
            if (props.updateRoleDetails.success !== false) {
                setAddRole(false);
            }
            else {
            }
        }
    }, [props.updateRoleDetails]);

    const refreshPage = () => {
        props.actions.postAll('getrolesbycurrentdate/7', pageInfo, "rolesList");
    }

    const pageInfoHandler = (event) => {
        if (event.target.name === "size") {
            setPageInfo({ ...pageInfo, [event.target.name]: Number(event.target.value), ['page']: 1 });
        }
        else {
            setPageInfo({ ...pageInfo, [event.target.name]: Number(event.target.value) });
        }
    }

    const deleteRole = (value, id) => {
        setShowDeleteConfirm(value);
        setDeletingRoleId(id);
    }

    const newRoleToggler = (value) => {
        setNewRole(value);
    }

    // useEffect(() => {
    //     console.log(props.rolesList);
    // }, [props.rolesList]);

    const pagination = (page) => {
        let option = [];
        for (var i = 1; i <= page; i++) {
            option.push(<option key={i} value={i}>{i}</option>);
        }

        return option;
    }

    return (
        <>

            {
                !addRole
                    ?
                    <div>
                        <Modal show={showDeleteConfirm} modalClosed={showDeleteConfirmToggler}>
                            <DeleteConformation cancel={showDeleteConfirmToggler} id={deletingRoleId} refresh={refreshPage} />
                        </Modal>
                        <div className={classes.layout}>
                            <div className={classes.header}>
                                <h3 className={classes.title}>Roles and Rates</h3>
                                <button className={classes.addRole} onClick={() => { setNewRole(true); addRoleToggler(true) }}>Add Role</button>
                            </div>

                            <div className={classes.table}>
                                {
                                    props.rolesList.data && props.rolesList.data.length === 0 ?
                                        <>
                                            <p> Roles not found! </p>
                                        </>
                                        : <RolesAndRatesData viewUpdate={addRoleToggler} delete={deleteRole} />
                                }
                            </div>

                            <div className={classes.pageFilterLayout}>
                                <div className={classes.rolesPerPage}>
                                    <p>Roles per Page</p>
                                    <select name="size" onChange={pageInfoHandler}>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                </div>
                                <div className={classes.page}>
                                    <p>Page</p>
                                    <select name="page" onChange={pageInfoHandler} value={pageInfo.page}>
                                        {
                                            props.rolesList.data && props.rolesList.data.length == 0 ?
                                                <option value={1} className={classes.option}>1</option>
                                                : pagination(props.rolesList.total_page)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <AddRole
                        role={addRole}
                        addRoleToggle={addRoleToggler}
                        refresh={refreshPage}
                        newRole={newRole}
                        newRoleToggle={newRoleToggler} />
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        addRoleDetails: state.crud.addRoleDetails,
        rolesList: state.crud.rolesList,
        roleDetails: state.crud.roleDetails,
        updateRoleDetails: state.crud.updateRoleDetails,
        deleteRole: state.crud.deleteRole,
        lastAction: state.comp.lastAction
    };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        Object.assign({}, crudAction, componentAction),
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RolesAndRates);
