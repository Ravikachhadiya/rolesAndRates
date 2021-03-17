import React, { useState, useEffect } from 'react';
import classes from './Layout.module.css';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as crudAction from '../../storeUtils/actions/crudAction';
import * as componentAction from '../../storeUtils/actions/componentActions';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Layout = (props) => {

    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState('error');

    const snackbarHandleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    useEffect(() => {
        console.log(props.addRoleDetails);

        if (props.addRoleDetails !== undefined) {
            setSnackbarMsg(props.addRoleDetails.message);
            setOpenSnackbar(true);
            if (props.addRoleDetails.success) {
                setSeverity('success')
            }
            else {
                setSeverity('error')
            }
        }
    }, [props.addRoleDetails])

    useEffect(() => {
        console.log(props.addRoleDetails);

        if (props.updateRoleDetails !== undefined) {
            setSnackbarMsg(props.updateRoleDetails.message);
            setOpenSnackbar(true);
            if (props.updateRoleDetails.success) {
                setSeverity('success')
            }
            else {
                setSeverity('error')
            }
        }
    }, [props.updateRoleDetails])

    useEffect(() => {
        console.log(props.deleteRole);

        if (props.deleteRole !== undefined) {
            setSnackbarMsg(props.deleteRole.message);
            setOpenSnackbar(true);
            if (props.deleteRole.success) {
                setSeverity('success')
            }
            else {
                setSeverity('error')
            }
        }
    }, [props.deleteRole])

    return (
        <>
            <Link to="/Roles">
                <Button className={classes.btn}>
                    Roles
            </Button >
            </Link>

            <>
                <Snackbar className={classes.snackbar} open={openSnackbar} autoHideDuration={3000} onClose={snackbarHandleClose}>
                    <Alert onClose={snackbarHandleClose} severity={severity}>{snackbarMsg}</Alert>
                </Snackbar>
            </>
        </>
    );
}


const mapStateToProps = state => {
    return {
        addRoleDetails: state.crud.addRoleDetails,
        // ratePeriodDetails: state.comp.ratePeriod,
        roleDetails: state.crud.roleDetails,
        updateRoleDetails: state.crud.updateRoleDetails,
        deleteRole: state.crud.deleteRole,
        // lastAction: state.comp.lastAction
    };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        Object.assign({}, crudAction),
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
// export default Layout;