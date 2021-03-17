import React, { useState, useEffect } from 'react';
import classes from './RolesAndRatesData.module.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as crudAction from '../../storeUtils/actions/crudAction';

const RolesAndRatesData = (props) => {

    const [width, setWidth] = useState(window.innerWidth);
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const handlerWidth = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handlerWidth);
        return window.removeEventListener('resize', handlerWidth);
    }, []);

    const viewUpdate = (id) => {
        props.actions.getAll('getRoleDetails/' + id, 'roleDetails');
        props.viewUpdate(true);
    }

    const [rolesList, setRoleList] = useState({ data: [] });

    useEffect(() => {
        setRoleList(props.rolesList);
    }, [props.rolesList]);



    return (
        rolesList.data.length === 0 ?
            <>
                <p>Roles not found!</p>
            </>

            :
            <>
                {
                    width > 540 ?
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell className={classes.headCell} align="center">No</TableCell>
                                        <TableCell className={classes.headCell} >Role Name</TableCell>
                                        <TableCell className={classes.headCell} >Role Code</TableCell>
                                        <TableCell className={classes.headCell} >Level 1</TableCell>
                                        <TableCell className={classes.headCell} >Level 2</TableCell>
                                        <TableCell className={classes.headCell} >Level 3</TableCell>
                                        <TableCell className={classes.headCell} >Level 4</TableCell>
                                        <TableCell className={classes.headCell} >Level 5</TableCell>
                                        <TableCell className={classes.headCell} align="center">View/Update</TableCell>
                                        <TableCell className={classes.headCell} align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {
                                        rolesList.data.map((role, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row" align="center">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>{role.role_name}</TableCell>
                                                    <TableCell>{role.role_code}</TableCell>

                                                    <TableCell >{
                                                        role.RoleRates == "null"
                                                            ? '-'
                                                            : role.RoleRates.level1 !== 0 ?
                                                                '$' + role.RoleRates.level1
                                                                : '-'}
                                                    </TableCell>
                                                    <TableCell >{
                                                        role.RoleRates == "null"
                                                            ? '-'
                                                            : role.RoleRates.level2 !== 0 ?
                                                                '$' + role.RoleRates.level2
                                                                : '-'}
                                                    </TableCell>
                                                    <TableCell >{
                                                        role.RoleRates == "null"
                                                            ? '-'
                                                            : role.RoleRates.level3 !== 0 ?
                                                                '$' + role.RoleRates.level3
                                                                : '-'}
                                                    </TableCell>
                                                    <TableCell >{
                                                        role.RoleRates == "null"
                                                            ? '-'
                                                            : role.RoleRates.level4 !== 0 ?
                                                                '$' + role.RoleRates.level4
                                                                : '-'}
                                                    </TableCell>
                                                    <TableCell >{
                                                        role.RoleRates == "null"
                                                            ? '-'
                                                            : role.RoleRates.level5 !== 0 ?
                                                                '$' + role.RoleRates.level5
                                                                : '-'}
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <button
                                                            className={[classes.btn, classes.submitBtn].join(' ')}
                                                            onClick={() => viewUpdate(role.id)}>View/Update
                                                        </button>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <button
                                                            className={[classes.btn, classes.submitBtn].join(' ')}
                                                            onClick={() => props.delete(true, role.id)}
                                                        >Delete
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                        :
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell style={{ width: "1px" }} align="center" />
                                        {/* <TableCell className={classes.headCell} align="center">No</TableCell> */}
                                        <TableCell className={classes.headCell} align="center">Name</TableCell>
                                        <TableCell className={classes.headCell} align="center">Code</TableCell>
                                        <TableCell className={classes.headCell} align="center">View</TableCell>
                                        <TableCell className={classes.headCell} align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rolesList.data.map((role, index) => (
                                        <React.Fragment key={index}>
                                            <TableRow className={[classes.root, classes.row].join(' ')}>
                                                <TableCell className={classes.headCell}>
                                                    <IconButton className={classes.icon} aria-label="expand row" size="small"
                                                        onClick={() => {
                                                            setCurrentIndex(currentIndex == index ? -1 : index);
                                                            setOpen(currentIndex == index ? false : true)
                                                        }}>
                                                        {(open && index == currentIndex) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>

                                                <TableCell className={classes.headCell} component="th" scope="row" align="center" >
                                                    {role.role_name}
                                                </TableCell>
                                                <TableCell className={classes.headCell} align="center">{role.role_code}</TableCell>
                                                <TableCell className={classes.headCell} align="center">
                                                    <EditIcon
                                                        style={{ color: 'skyBlue' }}
                                                        className={[classes.btn, classes.submitBtn].join(' ')}
                                                        onClick={() => viewUpdate(role.id)}>View/Update
                                                    </EditIcon>
                                                </TableCell>
                                                <TableCell className={classes.headCell} align="center">
                                                    <DeleteIcon
                                                        style={{ color: 'crimson' }}
                                                        className={[classes.btn, classes.submitBtn].join(' ')}
                                                        onClick={() => props.delete(true, role.id)}
                                                    >Delete
                                                    </DeleteIcon>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className={classes.subRow}>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                    <Collapse in={open && index == currentIndex} timeout="auto" unmountOnExit>
                                                        <Box margin={1}>
                                                            <Table size="small" aria-label="purchases">
                                                                <TableHead className={classes.tableHead}>
                                                                    <TableRow className={[classes.row, classes.subRow].join('')}>
                                                                        <TableCell padding="none" size="small" className={classes.headCell} >Level 1</TableCell>
                                                                        <TableCell padding="none" size="small" className={classes.headCell} >Level 2</TableCell>
                                                                        <TableCell padding="none" size="small" className={classes.headCell} >Level 3</TableCell>
                                                                        <TableCell padding="none" size="small" className={classes.headCell} >Level 4</TableCell>
                                                                        <TableCell padding="none" size="small" className={classes.headCell} >Level 5</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow key={index} className={classes.dataRow}>
                                                                        <TableCell className={classes.data} padding="none" size="small" >{
                                                                            role.RoleRates == "null"
                                                                                ? '-'
                                                                                : role.RoleRates.level1 !== 0 ?
                                                                                    '$' + role.RoleRates.level1
                                                                                    : '-'}
                                                                        </TableCell>
                                                                        <TableCell className={classes.data} padding="none" size="small" >{
                                                                            role.RoleRates == "null"
                                                                                ? '-'
                                                                                : role.RoleRates.level2 !== 0 ?
                                                                                    '$' + role.RoleRates.level2
                                                                                    : '-'}
                                                                        </TableCell>
                                                                        <TableCell className={classes.data} padding="none" size="small" >{
                                                                            role.RoleRates == "null"
                                                                                ? '-'
                                                                                : role.RoleRates.level3 !== 0 ?
                                                                                    '$' + role.RoleRates.level3
                                                                                    : '-'}
                                                                        </TableCell>
                                                                        <TableCell className={classes.data} padding="none" size="small" >{
                                                                            role.RoleRates == "null"
                                                                                ? '-'
                                                                                : role.RoleRates.level4 !== 0 ?
                                                                                    '$' + role.RoleRates.level4
                                                                                    : '-'}
                                                                        </TableCell>
                                                                        <TableCell className={classes.data} padding="none" size="small" >{
                                                                            role.RoleRates == "null"
                                                                                ? '-'
                                                                                : role.RoleRates.level5 !== 0 ?
                                                                                    '$' + role.RoleRates.level5
                                                                                    : '-'}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
            </>

        // : <DeleteConformation showDeleteConfirmToggler={showDeleteConfirmToggler} />
    );
}

const mapStateToProps = state => {
    return {
        rolesList: state.crud.rolesList,
        roleDetails: state.crud.roleDetails
    };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        Object.assign({}, crudAction),
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RolesAndRatesData);
