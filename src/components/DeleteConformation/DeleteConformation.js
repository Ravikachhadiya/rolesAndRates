import React from 'react';
import classes from './DeleteConformation.module.css';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as crudAction from '../../storeUtils/actions/crudAction';

const DeleteConformation = (props) => {

    const deleteRole = () => {
        props.actions.deleteAll('deleteRoleAndRates/' + props.id, 'deleteRole');
        props.cancel(false);
        // props.refresh();
    }

    return (
        <div className={classes.MainLayout}>
            <div className={classes.Layout}>
                <div className={classes.header}>
                    <p>Confirm Delete</p>
                </div>
                <div className={classes.messageLayout}>
                    <div className={classes.message}>
                        <p>Are you sure you want to delete this role?</p>
                    </div>
                    <div>
                        <button className={classes.btn} onClick={() => props.cancel(false)}>cancel</button>
                        <button className={classes.btn} onClick={deleteRole}>yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        deleteRole: state.crud.deleteRole
    };
}


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        Object.assign({}, crudAction),
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConformation);
