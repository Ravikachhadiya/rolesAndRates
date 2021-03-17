import React, { useState, useEffect } from 'react';
import classes from './AddRole.module.css';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as crudAction from '../../storeUtils/actions/crudAction';
import * as componentAction from '../../storeUtils/actions/componentActions';

import AddRatePeriod from '../AddRatePeriod/AddRatePeriod';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const AddRole = (props) => {

    const [roleDetails, setRoleDetails] = useState({
        role_name: '',
        role_code: '',
        number_of_level: ''
    });
    const [roleDetailsError, setRoleDetailsError] = useState({});
    const [ratePeriodToggle, setRatePeriodToggle] = useState(false);
    const [snackbarErrorMsg, setSnackbarErrorMsg] = useState('');
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [addRatePeriod, setAddNewRatePeriod] = useState(false);
    const [submitDisable, setSubmitDisable] = useState(true);
    // const [showError, setShowError] = useState(false);

    useEffect(() => {
        //console.log(props.addRoleDetails);
        //console.log(props.roleDetails);
        if (props.addRoleDetails !== undefined) {
            if (props.addRoleDetails.success === false) {
                setSnackbarErrorMsg(props.addRoleDetails.message);
                setOpenErrorSnackbar(true);
            }
            else {
                setRoleDetails({});
                setRoleDetailsError({});
                setRatePeriodToggle(false);
                let data = {
                    level: 0,
                    isAdd: true,
                    row: 0
                }

                props.actions.addRatePeriod(data);
            }
        }

    }, [props.addRoleDetails]);

    useEffect(() => {
        //console.log(props.addRoleDetails);
        //console.log(props.roleDetails);

        if (props.updateRoleDetails !== undefined) {
            if (props.updateRoleDetails.success === false) {
                setSnackbarErrorMsg(props.updateRoleDetails.message);
                setOpenErrorSnackbar(true);
            }
            else {
                setRoleDetails({});
                setRoleDetailsError({});
                setRatePeriodToggle(false);
                let data = {
                    level: 0,
                    isAdd: true,
                    row: 0
                }

                props.actions.addRatePeriod(data);
            }
        }
    }, [props.updateRoleDetails]);

    // useEffect(() => {
    //     console.log("submit : ", submitDisable);
    // }, [submitDisable]);

    useEffect(() => {
        if (props.roleDetails.data.length !== 0 && !props.newRole) {

            let ratePeriodDtls = {
                level: props.roleDetails.data.number_of_level,
                isAdd: true,
                row: props.roleDetails.data.RoleRates.length
            }
            props.actions.addRatePeriod({ ...ratePeriodDtls })

            // console.log(props.roleDetails.data, props.roleDetails.data.RoleRates.length);
            setRoleDetails({ ...props.roleDetails.data });

            setRatePeriodToggle(true);
            submitDisableToggler("roleDetails : ", false);
        }
    }, [props.roleDetails]);

    useEffect(() => {
        if (roleDetails.role_name === '' || roleDetails.role_code === ''
            || roleDetails.number_of_level === '') {
            submitDisableToggler("name, code: ", true);
        }
        else if (roleDetails.RoleRates != undefined) {
            if (roleDetails.RoleRates.length == 0)
                submitDisableToggler("rate 1: ", true);
            else
                submitDisableToggler("else : ", false);
        }
        else if (roleDetails.role_rates_period != undefined) {
            if (roleDetails.role_rates_period.length == 0)
                submitDisableToggler("rate 2: ", true);
            else
                submitDisableToggler("else : ", false);
        }
        else if (roleDetails.RoleRates == undefined && roleDetails.role_rates_period == undefined) {
            submitDisableToggler("rate 3: ", true);
        }
        else {
            submitDisableToggler("else : ", false);
        }
    }, [roleDetails.role_code, roleDetails.role_name, roleDetails.number_of_level]);

    const submitDisableToggler = (path, value) => {
        // console.log(path, value);
        setSubmitDisable(value);
    }
    const errorHandleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorSnackbar(false);
    };

    const roleDetailsHandler = (event) => {
        if (props.roleDetails.data.length !== 0) {
            props.actions.reset('roleDetails');
        }
        if (event.target.name === "number_of_level") {
            if (event.target.value.charAt(0).match(/^[1-5]$/) || event.target.value.charAt(0) === '') {
                setRoleDetails({
                    ...roleDetails,
                    [event.target.name]: event.target.value.charAt(0)
                });
                setRoleDetailsError({
                    ...roleDetailsError,
                    ["number_of_level"]: ''
                });
                // setRatePeriodToggle(false);
                // props.actions.addRatePeriod({ ...props.ratePeriodDetails, ["row"]: 0 })
                setAddNewRatePeriod(false);
            }
            else {
                setRoleDetailsError({
                    ...roleDetailsError,
                    ["number_of_level"]: 'please enter only number in between 1 to 5.'
                });
            }
        }
        else {
            setRoleDetails({
                ...roleDetails,
                [event.target.name]: event.target.value
            });
            setRoleDetailsError({
                ...roleDetailsError,
                [event.target.name]: ''
            });
            // setRatePeriodToggle(false);
            // props.actions.addRatePeriod({ ...props.ratePeriodDetails, ["row"]: 0 })
        }
    }

    const addRatePeriodSubmit = (event) => {
        // console.log(props.ratePeriodDetails)
        if (props.ratePeriodDetails.isAdd) {
            event.preventDefault();
            if (addRoleValidation()) {
                setRatePeriodToggle(true);
                setAddNewRatePeriod(true);
                // console.log("add btn : ", true);
            }

            // console.log(props.ratePeriodDetails.level == roleDetails.number_of_level);
            let data = {
                level: roleDetails.number_of_level,
                isAdd: true,
                row: props.ratePeriodDetails.level == roleDetails.number_of_level ? props.ratePeriodDetails.row + 1 : 1
            }

            props.actions.addRatePeriod(data);
        }
        else {
            event.preventDefault();
        }
    }

    const addRateToggler = (path, value) => {
        // console.log(path, " : ", value);
        setAddNewRatePeriod(value)
    }

    const addRoleValidation = () => {
        // console.log("validation")
        //console.log(roleDetails);
        if (roleDetails.role_name === '') {
            setRoleDetailsError({
                ...roleDetailsError,
                ["role_name"]: "please enter role name!"
            });
            return false;
        }
        if (roleDetails.role_code === '') {
            setRoleDetailsError({
                ...roleDetailsError,
                ["role_code"]: "please enter role code!"
            });
            return false;
        }
        if (roleDetails.number_of_level === '') {
            setRoleDetailsError({
                ...roleDetailsError,
                ["number_of_level"]: "please enter number of levels!"
            });
            return false;
        }
        else if (!String(roleDetails.number_of_level).match(/^[1-5]$/)) {
            setRoleDetailsError({
                ...roleDetailsError,
                ["number_of_level"]: "please enter only number in between 1 to 5."
            });
            return false;
        }
        return true;
    }

    // useEffect(() => {
    //     console.log("add : ", addRatePeriod);
    // }, [addRatePeriod])

    const roleSubmit = (roleDtls) => {

        let role_details = { ...roleDtls };
        //console.log(roleDtls);
        role_details['company_id'] = 7;

        if (role_details.id !== undefined) {
            delete role_details.createdAt;
            delete role_details.updatedAt;
            role_details["role_id"] = role_details.id;
            delete role_details.id;
            delete role_details.added_by;
            if (role_details.role_rates_period === undefined) {
                role_details.role_rates_period = role_details.RoleRates;
            }
            delete role_details.RoleRates;

            role_details.role_rates_period = role_details.role_rates_period.map((data) => {
                delete data.createdAt;
                delete data.id;
                delete data.role_id;
                delete data.updatedAt;
                return data;
            })

            console.log(roleDtls);
            props.actions.putAll('updateRole', role_details, 'updateRoleDetails');
            props.newRoleToggle(false);
            // props.refresh();
        }
        else {
            role_details['added_by'] = 29;
            props.actions.postAll('addrole', role_details, 'addRoleDetails');
            props.newRoleToggle(false);
        }
        // setShowError(!showError);
    }

    const addRatePeriodHandler = (ratePeriodDetails) => {

        //console.log(ratePeriodDetails);
        let arr = [...ratePeriodDetails];
        setRoleDetails({ ...roleDetails, "role_rates_period": [...arr] });
        submitDisableToggler(false);
        //console.log(roleDetails);
    }

    return (
        <>
            <div className={classes.layout}>
                <div className={classes.header}>
                    <h3>Add Role</h3>
                </div>

                <div className={classes.addRateFormLayout}>
                    <form onSubmit={addRatePeriodSubmit}>
                        <div className={classes.addRateForm}>
                            <div className={classes.field}>
                                <label>Role Name <span>*</span> </label>
                                <div className={classes.inputLayout}>
                                    <input type="text" name="role_name" value={roleDetails.role_name} placeholder="Enter role name" onChange={roleDetailsHandler} />
                                    <span className={classes.errorMsg}>{roleDetailsError.role_name}</span>
                                </div>
                            </div>
                            <div className={classes.field}>
                                <label>Role Code <span>*</span> </label>
                                <div className={classes.inputLayout}>
                                    <input type="text" name="role_code" value={roleDetails.role_code} placeholder="Enter role code" onChange={roleDetailsHandler} />
                                    <span className={classes.errorMsg}>{roleDetailsError.role_code}</span>
                                </div>
                            </div>
                            <div className={classes.field}>
                                <label>Number of Levels <span>*</span></label>
                                <div className={classes.inputLayout}>
                                    <input type="text" name="number_of_level" value={roleDetails.number_of_level} placeholder="Enter level" onChange={roleDetailsHandler} />
                                    <span className={classes.errorMsg}>{roleDetailsError.number_of_level}</span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.addRatePeriod}>
                            <button type="submit" className={classes.addRatePeriodBtn} disabled={addRatePeriod} >ADD RATE PERIOD</button>
                        </div>
                    </form>
                </div>

                <div className={classes.addRatePeriodComponent}>
                    {ratePeriodToggle ?
                        <AddRatePeriod
                            level={roleDetails.number_of_level}
                            clicked={addRatePeriodHandler}
                            addRatePeriod={addRatePeriod}
                            submitToggler={submitDisableToggler}
                            addRateToggler={addRateToggler} />
                        : null
                    }
                </div>

                <div className={classes.submitLayout}>
                    <button
                        className={[classes.btn, classes.returnBtn].join(' ')}
                        onClick={() => { props.newRoleToggle(false); props.addRoleToggle(false) }}>RETURN</button>
                    <button
                        className={[classes.btn, classes.submitBtn].join(' ')}
                        onClick={() => { roleSubmit(roleDetails) }}
                        disabled={submitDisable}>SUBMIT</button>
                </div>

                <Snackbar className={classes.snackbar} open={openErrorSnackbar} autoHideDuration={6000} onClose={errorHandleClose}>
                    <Alert onClose={errorHandleClose} severity="error">{snackbarErrorMsg}</Alert>
                </Snackbar>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        addRoleDetails: state.crud.addRoleDetails,
        ratePeriodDetails: state.comp.ratePeriod,
        roleDetails: state.crud.roleDetails,
        updateRoleDetails: state.crud.updateRoleDetails,
        lastAction: state.comp.lastAction
    };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        Object.assign({}, crudAction, componentAction),
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRole);
