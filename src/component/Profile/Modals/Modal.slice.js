import {createSlice} from "@reduxjs/toolkit";
import Axios from "axios";
import {closeSnackbar, setSnackBarError, setSnackBarLoading, setSnackBarSuccess} from "../../../Reusables/Toast/Toast.slice";
import {URL} from "../../../Config/URL/url";

const ModalReudcer = createSlice({
    name:'modalreducer',
    initialState:{
        img:'',
        candidate:{}
    },
    reducers:{
        setImg : (state,action)=>{
            state.img = action.payload;
        },
        setCandidate : (state,action) => {
            state.candidate = action.payload;
        }
    }
});
export default ModalReudcer.reducer;

export const {setImg,setCandidate} = ModalReudcer.actions;

export const selectorModal = state => state.modal;

export const uploadImg = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    const formData = new FormData();
    formData.append("file",data);
    formData.append("name",localStorage.getItem('name'))
    formData.append('email',localStorage.getItem('email'));
    console.log(formData)
    Axios.post(URL+'update-profile-img',formData)
    .then(res=>{
        console.log(res)
        dispatch(setSnackBarSuccess("Updated Successfully"));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Some error occured, please try again"))
    })
}

export const getImg = (email) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.get(URL+'candidate-profile/'+email,{responseType:'blob'})
    .then(res => {
        var blob = new Blob([res.data]);
        var reader = new FileReader();
        reader.onload = function () {
        var b64 = reader.result.replace(/^data:.+;base64,/, '');
        var binary_string = window.atob(b64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        dispatch(setImg(bytes));
        };
        reader.readAsDataURL(blob);
        dispatch(closeSnackbar());
    })
    .catch(err => {
        console.log(err);
        dispatch(setSnackBarError('Some error occured!'));
    })
}

export const updateBasicDetails = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    console.log(data)
    Axios.put(URL+'update-candidate-basic',data)
    .then(res=>{
        console.log(res);
        dispatch(setSnackBarSuccess("Updated successfully"));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Some error occured, retry again."))
    })
}

export const fetchCandidate = (id) => dispatch => {
    dispatch(setSnackBarLoading())
    Axios.get(URL+'fetch-candidate/'+id)
    .then(res=>{
        dispatch(setCandidate(res.data[0]))
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Falied to load data, retry!"))
    })
}

//Education-services

export const addEducation = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.post(URL+'add-education',data)
    .then(res=>{
        dispatch(setSnackBarSuccess('Experience Added.'));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Some error occured, retry!"));
    })
}

export const updateEducation = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.put(URL+'update-education',data)
    .then(res=>{
        dispatch(setSnackBarSuccess('Update successful,refresh to see changes'));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Some error occured, retry!"));
    })
}

export const deleteEducation = ({id,e_id}) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.put(URL+'delete-education/'+id+'/'+e_id)
    .then(res=>{
        dispatch(setSnackBarSuccess("Deletion successfull, refresh page to see changes!"));
    })
    .catch(err=>{
        console.log(err)
        dispatch(setSnackBarError("Some error occured, please retry."));
    })
}

//Experience-Services

export const addExperience = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.post(URL+'add-experience',data)
    .then(res=>{
        dispatch(setSnackBarSuccess('Experience Added. Resfresh page to see changes'));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Some error occured, retry!"));
    })
}

export const updateExperience = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.put(URL+'update-experience',data)
    .then(res=>{
        dispatch(setSnackBarSuccess('Update successful,refresh to see changes'));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Some error occured, retry!"));
    })
}

export const deleteExperience = ({id,e_id}) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.put(URL+'delete-experience/'+id+'/'+e_id)
    .then(res=>{
        dispatch(setSnackBarSuccess("Deletion successfull, refresh page to see changes!"));
    })
    .catch(err=>{
        console.log(err)
        dispatch(setSnackBarError("Some error occured, please retry."));
    })
}

//Certi-Services

export const addCerti = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.post(URL+'add-certi',data)
    .then(res=>{
        dispatch(setSnackBarSuccess('Certificate Added. Resfresh page to see changes'));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Some error occured, retry!"));
    })
}

export const updateCerti = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.put(URL+'update-certi',data)
    .then(res=>{
        dispatch(setSnackBarSuccess('Update successful,refresh to see changes'));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Some error occured, retry!"));
    })
}

export const deleteCerti = ({id,e_id}) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.put(URL+'delete-certi/'+id+'/'+e_id)
    .then(res=>{
        dispatch(setSnackBarSuccess("Deletion successfull, refresh page to see changes!"));
    })
    .catch(err=>{
        console.log(err)
        dispatch(setSnackBarError("Some error occured, please retry."));
    })
}

//Project-Services

export const addProject = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.post(URL+'add-project',data)
    .then(res=>{
        dispatch(setSnackBarSuccess('Project Added. Resfresh page to see changes'));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Some error occured, retry!"));
    })
}

export const updateProject = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.put(URL+'update-project',data)
    .then(res=>{
        dispatch(setSnackBarSuccess('Update successful,refresh to see changes'));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Some error occured, retry!"));
    })
}

export const deleteProject = ({id,e_id}) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.put(URL+'delete-project/'+id+'/'+e_id)
    .then(res=>{
        dispatch(setSnackBarSuccess("Deletion successfull, refresh page to see changes!"));
    })
    .catch(err=>{
        console.log(err)
        dispatch(setSnackBarError("Some error occured, please retry."));
    })
}

export const addSkill = (data) => dispatch => {
    dispatch(setSnackBarLoading());
    Axios.post(URL+'add-skills',data)
    .then(res=>{
        dispatch(setSnackBarSuccess('Skills Added. Resfresh page to see changes'));
    })
    .catch(err=>{
        console.log(err);
        dispatch(setSnackBarError("Some error occured, retry!"));
    })
}
