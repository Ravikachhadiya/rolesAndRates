import React, { useEffect, useState, useRef } from 'react';
import classes from './AddRatePeriod.module.css';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as crudAction from '../../storeUtils/actions/crudAction';
import * as componentAction from '../../storeUtils/actions/componentActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const AddRatePeriod = (props) => {

    // const [date, setDate] = useState([new Date(), new Date()]);
    // const [rateValid, setRateValid] = useState([new Date(), new Date()]);
    const [ratePeriodDetail, setRatePeriodDetail] = useState({
        level1: '',
        level2: '',
        level3: '',
        level4: '',
        level5: '',
        period_end: '',
        period_start: ''
    });
    const [currentRateInput, setCurrentRateInput] = useState({ currentRateEdit: false, currentRateInputId: null });
    // const [ratePeriodDetails, setRatePeriodDetails] = useState([]);
    const [snackbarErrorMsg, setSnackbarErrorMsg] = useState('');
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    // const [addRatePeriod, setAddRatePeriod] = useState(false);
    const [ratePeriodRowsDetails, setRatePeriodRowsDetails] = useState([]);
    const [ratePeriodDates, setRatePeriodDates] = useState([]);
    const isFirstRun = useRef(false);

    // console.log("abc ", props.abc);
    const errorHandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenErrorSnackbar(false);
    };

    useEffect(() => {
        console.log(ratePeriodDetail.period_start, ratePeriodDetail.period_end);
    }, [ratePeriodDetail.period_start, ratePeriodDetail.period_end]);

    useEffect(() => {
        // props.addRatePeriod ? setAddRatePeriod(true) : setAddRatePeriod(false);
        //console.log(props.ratePeriodDetails);
        //console.log(ratePeriodRowsDetails);
        //console.log(props.addRatePeriod);
        if (ratePeriodRowsDetails.length != props.ratePeriodDetails.row && props.addRatePeriod) {
            isFirstRun.current = true;
            let id = Number(props.ratePeriodDetails.row) - 1;
            setCurrentRateInput({ ...currentRateInput, currentRateEdit: true, currentRateInputId: id })
            // console.log("---------------------------");
            // setAddRatePeriod(false)

            let ratePeriodRow = {
                period_start: '',
                period_end: '',
                level: props.ratePeriodDetails.level,
            }
            for (var i = 1; i <= props.ratePeriodDetails.level; i++) {
                ratePeriodRow["level" + i] = ''
            }

            let arrTemp;
            if (ratePeriodRowsDetails.length > props.ratePeriodDetails.row) {
                arrTemp = [];
                arrTemp.push(ratePeriodRow);
                setRatePeriodDates([]);
            }
            else {
                arrTemp = ratePeriodRowsDetails
                arrTemp.push(ratePeriodRow);
            }

            setRatePeriodRowsDetails(arrTemp);
            props.submitToggler("first Time", true);
            props.addRateToggler("after btn clicked", true);
        }
        else if (ratePeriodRowsDetails.level != props.ratePeriodDetails.level && props.addRatePeriod) {
            // editRatePeriodRow(0);
            let ratePeriodRow = {
                period_start: '',
                period_end: '',
                level: props.ratePeriodDetails.level,
            }
            for (var i = 1; i <= props.ratePeriodDetails.level; i++) {
                ratePeriodRow["level" + i] = ''
            }
            let arrTemp = [];
            arrTemp.push(ratePeriodRow);
            setRatePeriodRowsDetails(arrTemp);
            setRatePeriodDates([]);
            setCurrentRateInput({ ...currentRateInput, currentRateEdit: true, currentRateInputId: 0 })
        }
        // console.log(ratePeriodRowsDetails)
        // console.log(currentRateInput)
    }, [props.ratePeriodDetails]);

    useEffect(() => {
        if (props.roleDetails.data.length !== 0) {
            let arr = [...props.roleDetails.data.RoleRates];
            setRatePeriodRowsDetails([...arr]);
            let dates = arr.map((data) => {
                return [data.period_start, data.period_end];
            });
            //console.log(dates);
            setRatePeriodDates([...dates]);
        }
    }, [props.roleDetails]);

    const ratePeriodValidation = () => {
        let result = true;
        for (var i = 1; i <= props.level; i++) {
            if (ratePeriodDetail["level" + i] === '') {
                result = false;
                break;
            }
        }
        if (ratePeriodDetail.period_start === '' || ratePeriodDetail.period_end === '') {
            // console.log(ratePeriodDetail)
            // console.log("false here in date")
            result = false;
        }
        // console.log(result);
        return result;
    }

    const endDateValidation = (date, event) => {
        let checkEndDate = true;
        let endDate = null;
        date !== null ? endDate = date : endDate = event.target.value;

        if (date === "") {
            return;
        }

        // check date is come after start date or not
        if (ratePeriodRowsDetails.length === ratePeriodDates.length) {
            if (new Date(endDate).getTime() <= new Date(ratePeriodDates[currentRateInput.currentRateInputId][0]).getTime())
                checkEndDate = false;
        }

        // check date is in between other dates or not
        ratePeriodDates.map((dates, index) => {
            //console.log(dates, index);
            if (new Date(endDate).getTime() >= new Date(dates[0]).getTime()
                && new Date(endDate).getTime() <= new Date(dates[1]).getTime()
                && index !== currentRateInput.currentRateInputId) {
                checkEndDate = false;
            }
            if (ratePeriodRowsDetails.length === ratePeriodDates.length) {
                if (index == currentRateInput.currentRateInputId) {
                    if (new Date(endDate).getTime() < new Date(dates[0]).getTime()
                        && new Date(endDate) > new Date(dates[1]).getTime()) {
                        checkEndDate = false;
                    }
                }
                else if (new Date(ratePeriodDates[currentRateInput.currentRateInputId][0]) < new Date(dates[0]).getTime()
                    && new Date(endDate) > new Date(dates[1]).getTime()) {
                    checkEndDate = false;
                }
            }
        })


        // if date is valid then add to the state
        if (checkEndDate) {
            setRatePeriodDetail({
                ...ratePeriodDetail,
                [date !== null ? 'period_end' : event.target.name]: endDate,
                ["period_start"]: event.target.name === 'period_start' ? event.target.value : ratePeriodDetail.period_start
            });

            let arr = [...ratePeriodDates];

            if (ratePeriodRowsDetails.length !== ratePeriodDates.length) {
                arr.push(['', event.target.value]);
                setRatePeriodDates([...arr]);
            }
            else {
                if (date == null) {
                    arr[currentRateInput.currentRateInputId][1] = event.target.value
                }
            }
        }
        // else set '' (empty)
        else {
            setRatePeriodDetail({
                ...ratePeriodDetail,
                [date !== null ? "period_end" : event.target.name]: '',
                ["period_start"]: '',
            });

            let arr = [...ratePeriodDates];

            if (ratePeriodRowsDetails.length !== ratePeriodDates.length) {
                arr.push(['', '']);
                setRatePeriodDates([...arr]);
            }
            else {
                arr[currentRateInput.currentRateInputId][0] = '';
                arr[currentRateInput.currentRateInputId][1] = '';
                setRatePeriodDates([...arr]);
            }
        }
    }

    const addRatePeriodHandler = (event) => {
        //console.log(event.target.name, event.target.id, event.target.value);
        //console.log(ratePeriodRowsDetails.length);
        if (event.target.name == "period_start" || event.target.name == "period_end") {

            // console.log(event.target.value);

            // date validation
            if (ratePeriodDates.length !== 0) {
                // start date validation

                //console.log("In if");
                if (event.target.name == "period_start") {

                    let checkStartDate = true;

                    // check date is in between other dates or not
                    ratePeriodDates.map((dates, index) => {
                        if (new Date(event.target.value).getTime() >= new Date(dates[0]).getTime()
                            && new Date(event.target.value).getTime() <= new Date(dates[1]).getTime()
                            && currentRateInput.currentRateInputId !== index) {
                            checkStartDate = false;
                            //console.log("start Date : False , index and length", ratePeriodDates.length, index);
                        }
                    })

                    //console.log("start", checkStartDate);
                    // if date is valid then add to the state
                    if (checkStartDate) {
                        setRatePeriodDetail({
                            ...ratePeriodDetail,
                            [event.target.name]: event.target.value
                        });

                        //console.log(event.target.value);

                        let arr = [...ratePeriodDates];

                        if (ratePeriodRowsDetails.length !== ratePeriodDates.length) {
                            arr.push([event.target.value, '']);
                            setRatePeriodDates([...arr]);
                        }
                        else {
                            arr[currentRateInput.currentRateInputId][0] = event.target.value;
                            setRatePeriodDates([...arr]);
                        }

                        if (ratePeriodRowsDetails.length === ratePeriodDates.length) {
                            endDateValidation(arr[currentRateInput.currentRateInputId][1], event);
                        }
                        // else{
                        //     endDateValidation(arr[currentRateInput.currentRateInputId][1], event);
                        // }
                    }
                    // else set '' (empty)
                    else {
                        setRatePeriodDetail({
                            ...ratePeriodDetail,
                            [event.target.name]: ''
                        });
                    }
                }
                // End date validation
                else {
                    endDateValidation(null, event);
                }
            }
            else {
                setRatePeriodDetail({
                    ...ratePeriodDetail,
                    [event.target.name]: event.target.value
                });

                let arr = [...ratePeriodDates];
                if (event.target.name == 'period_start')
                    arr.push([event.target.value, '']);
                else
                    arr.push(['', event.target.value]);

                setRatePeriodDates([...arr]);
            }

            //console.log(ratePeriodDetail)
        }
        else {
            if (event.target.value.match(/^[0-9]+[.]*[0-9]*$/) || event.target.value === '') {
                setRatePeriodDetail({
                    ...ratePeriodDetail,
                    [event.target.name]: event.target.value
                });
            }
        }
    }

    const editRatePeriodRow = (index) => {
        setRatePeriodDetail(ratePeriodRowsDetails[index])
        setCurrentRateInput({ currentRateEdit: true, currentRateInputId: index })
        props.submitToggler("edit", true);
        props.addRateToggler("edit", true);
    }

    const closeRatePeriodRow = (index) => {
        //console.log("...here");
        if (ratePeriodRowsDetails[index].period_start === '' && ratePeriodRowsDetails[index].period_end === '' && ratePeriodRowsDetails[index].level1 === '') {
            deleteRatePeriodRow(index);
        }
        setRatePeriodDetail({
            level1: '',
            level2: '',
            level3: '',
            level4: '',
            level5: '',
            period_end: '',
            period_start: ''
        });
        setCurrentRateInput({ currentRateEdit: false, currentRateInputId: null })
        if (index !== 0) {
            props.submitToggler("close : ", false);
        }
        props.addRateToggler("close", false);
    }

    const deleteRatePeriodRow = (index) => {
        let ratePeriodArrTemp = [...ratePeriodRowsDetails];
        ratePeriodArrTemp.splice(index, 1);
        setRatePeriodRowsDetails(ratePeriodArrTemp);
        props.actions.addRatePeriod({ ...props.ratePeriodDetails, ["row"]: props.ratePeriodDetails.row - 1 })

        let arr = [...ratePeriodDates];
        arr.splice(index, 1);

        setRatePeriodDates([...arr]);

        props.clicked([...ratePeriodArrTemp]);
        if (index === 0) {
            console.log("...");
            props.submitToggler("delete", true);
        }
        else {
            props.submitToggler("delete", false);
        }
        props.addRateToggler("delete", false);
    }

    const addRatePeriodSubmit = () => {
        // console.log("in it");
        if (ratePeriodValidation()) {
            let ratePeriodDetailTemp = ratePeriodDetail;

            let arr = ratePeriodRowsDetails;
            let index = 0;
            arr.map((data, ind) => {
                if (ind === currentRateInput.currentRateInputId) {
                    index = ind
                    return data;
                }
                else {
                    return data;
                }
            });

            arr[index] = ratePeriodDetailTemp;
            setRatePeriodRowsDetails(arr);

            //console.log(ratePeriodRowsDetails, arr);
            props.clicked([...ratePeriodRowsDetails]);
            setCurrentRateInput({ currentRateEdit: false, currentRateInputId: null })

            let data = {
                ...props.ratePeriodDetails,
                isAdd: true,
            }

            props.actions.addRatePeriod(data);
            props.addRateToggler("submit", false);

            setRatePeriodDetail({
                level1: '',
                level2: '',
                level3: '',
                level4: '',
                level5: '',
                period_end: '',
                period_start: ''
            });
        }
        else {
            // console.log('error');
            setSnackbarErrorMsg('Please fill all the fields with proper data.');
            setOpenErrorSnackbar(true);
        }
    }

    const buildHeadRow = (rows) => {
        let tableCells = [];
        for (var i = 1; i <= rows; i++) {
            tableCells.push(
                <TableCell className={classes.headCell} key={i}>Level {i}</TableCell>
            );
        }
        return tableCells;
    }

    const buildRow = (level, row, index) => {
        // console.log(currentRateInput.currentRateEdit, currentRateInput.currentRateInputId, row.id)
        let tableCells = [];
        for (var i = 1; i <= level; i++) {
            tableCells.push(
                <TableCell className={classes.tableCell} key={i}>
                    <input
                        className={classes.levelValue}
                        type="text"
                        name={"level" + i}
                        disabled={currentRateInput.currentRateInputId !== index}
                        placeholder={"Enter level " + i + " rate"}
                        onChange={addRatePeriodHandler}
                        value={
                            currentRateInput.currentRateInputId !== index
                                ? "$" + row["level" + i]
                                : ratePeriodDetail["level" + i]

                        }
                    />
                </TableCell>
            );
        }
        return tableCells;
    }

    return (
        props.ratePeriodDetails.row !== 0 ?
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell className={classes.headCell} >Period Start</TableCell>
                                <TableCell className={classes.headCell} >Period End</TableCell>
                                {buildHeadRow(props.ratePeriodDetails.level)}
                                <TableCell className={classes.headCell} align="center"></TableCell>
                                <TableCell className={classes.headCell} align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {rows.map((row) => ( */}
                            {ratePeriodRowsDetails.map((row, index) => {
                                // console.log(currentRateInput.currentRateInputId, row.id)
                                return (
                                    <TableRow key={index} className={classes.tableRow}>
                                        <TableCell className={classes.tableCell}>
                                            <TextField
                                                id="date"
                                                type="date"
                                                name="period_start"
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,

                                                }}
                                                InputProps={{
                                                    inputProps: {
                                                        max: new Date(new Date(ratePeriodDetail.period_end).
                                                            setDate(new Date(ratePeriodDetail.period_end).getDate() - 1)).getFullYear()
                                                            + '-' + ((new Date(new Date(ratePeriodDetail.period_end).
                                                                setDate(new Date(ratePeriodDetail.period_end).getDate() - 1)).getMonth() + 1) < 10
                                                                ? '0' + (new Date(new Date(ratePeriodDetail.period_end).
                                                                    setDate(new Date(ratePeriodDetail.period_end).getDate() - 1)).getMonth() + 1)
                                                                : (new Date(new Date(ratePeriodDetail.period_end).
                                                                    setDate(new Date(ratePeriodDetail.period_end).getDate() - 1)).getMonth() + 1))
                                                            + '-' + (new Date(new Date(ratePeriodDetail.period_end).
                                                                setDate(new Date(ratePeriodDetail.period_end).getDate() - 1)).getDate() < 10
                                                                ? '0' + new Date(new Date(ratePeriodDetail.period_end).
                                                                    setDate(new Date(ratePeriodDetail.period_end).getDate() - 1)).getDate()
                                                                : new Date(new Date(ratePeriodDetail.period_end).
                                                                    setDate(new Date(ratePeriodDetail.period_end).getDate() - 1)).getDate())
                                                    }
                                                }}
                                                value={
                                                    currentRateInput.currentRateInputId !== index
                                                        ? row.period_start
                                                        : ratePeriodDetail.period_start
                                                }
                                                disabled={currentRateInput.currentRateInputId !== index}
                                                onChange={addRatePeriodHandler}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            <TextField
                                                id="date"
                                                type="date"
                                                name="period_end"
                                                className={classes.textField}
                                                disabled={currentRateInput.currentRateInputId !== index}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    inputProps: {
                                                        min: new Date(new Date(ratePeriodDetail.period_start).
                                                            setDate(new Date(ratePeriodDetail.period_start).getDate() + 1)).getFullYear()
                                                            + '-' + ((new Date(new Date(ratePeriodDetail.period_start).
                                                                setDate(new Date(ratePeriodDetail.period_start).getDate() + 1)).getMonth() + 1) < 10
                                                                ? '0' + (new Date(new Date(ratePeriodDetail.period_start).
                                                                    setDate(new Date(ratePeriodDetail.period_start).getDate() + 1)).getMonth() + 1)
                                                                : (new Date(new Date(ratePeriodDetail.period_start).
                                                                    setDate(new Date(ratePeriodDetail.period_start).getDate() + 1)).getMonth() + 1))
                                                            + '-' + (new Date(new Date(ratePeriodDetail.period_start).
                                                                setDate(new Date(ratePeriodDetail.period_start).getDate() + 1)).getDate() < 10
                                                                ? '0' + new Date(new Date(ratePeriodDetail.period_start).
                                                                    setDate(new Date(ratePeriodDetail.period_start).getDate() + 1)).getDate()
                                                                : new Date(new Date(ratePeriodDetail.period_start).
                                                                    setDate(new Date(ratePeriodDetail.period_start).getDate() + 1)).getDate())
                                                    }
                                                }}
                                                value={
                                                    currentRateInput.currentRateInputId !== index
                                                        ? row.period_end
                                                        : ratePeriodDetail.period_end
                                                }
                                                onChange={addRatePeriodHandler}
                                            />
                                        </TableCell>
                                        {
                                            buildRow(props.ratePeriodDetails.level, row, index)
                                        }
                                        <TableCell align="center">
                                            {
                                                currentRateInput.currentRateInputId === index ?
                                                    <CheckIcon
                                                        style={{ color: "#148f14e3" }}
                                                        onClick={addRatePeriodSubmit}
                                                        className={[classes.btn].join(' ')} />

                                                    :
                                                    !currentRateInput.currentRateEdit ?
                                                        <EditIcon
                                                            style={{ color: "#148f14e3" }}
                                                            className={[classes.btn].join(' ')}
                                                            onClick={() => editRatePeriodRow(index)} />
                                                        : null

                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                currentRateInput.currentRateInputId === index ?
                                                    <CloseIcon
                                                        style={{ color: "#e51313de" }}
                                                        className={[classes.btn].join(' ')}
                                                        onClick={() => closeRatePeriodRow(index)} />

                                                    :
                                                    !currentRateInput.currentRateEdit ?
                                                        <DeleteIcon
                                                            style={{ color: "#e51313de" }}
                                                            className={[classes.btn].join(' ')}
                                                            onClick={() => deleteRatePeriodRow(index)} />
                                                        : null

                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar className={classes.snackbar} open={openErrorSnackbar} autoHideDuration={6000} onClose={errorHandleClose}>
                    <Alert onClose={errorHandleClose} severity="error">{snackbarErrorMsg}</Alert>
                </Snackbar>
            </div>

            : null
    );
}

const mapStateToProps = state => {
    return {
        roleDetails: state.crud.roleDetails,
        ratePeriodDetails: state.comp.ratePeriod
    };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        Object.assign({}, crudAction, componentAction),
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRatePeriod);