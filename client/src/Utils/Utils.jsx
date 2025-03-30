const backendNodeDomain = "https://bhasha-ai-api.vercel.app/";
const backendPythonDomain = "http://127.0.0.1:5001/";

const SummaryApi = {
    signUP : {
        url : `${backendNodeDomain}api/auth/signup`,
        method : "POST",
        done : "yes",
    },
    signIN : {
        url : `${backendNodeDomain}api/auth/signin`,
        method : "POST",
        done : "yes",
    },
    user : {
        url : `${backendNodeDomain}api/auth/user`,
        method : "GET",
        done : "yes",
    },
    contact : {
        url : `${backendNodeDomain}api/form/contact`,
        method : "POST",
        done : "yes",
    },
    emailSend : {
        url : `${backendNodeDomain}sendEmail`,
        method : "POST",
        done : "yes",
    },
    profile : {
        url : `${backendNodeDomain}api/for/complete_profile`,
        method : "POST",
        done : "yes",
    },
    getProfile : {
        url : `${backendNodeDomain}api/for/getProfile`,
        method : "POST",
    }, 
    getCourses : {
        url : `${backendNodeDomain}course`,
        method : "GET",
        done : "yes",
    },
    media : {
        url : `${backendNodeDomain}api/v1/media/create`,
        method : "POST",
    },
    mediaGet : {
        url : `${backendNodeDomain}api/v1/media/all`,
        method : "GET",
    },
    payment : {
        url : `${backendNodeDomain}api/payment`,
        method : "POST",
        done : "yes",
    },
    Admin : {
        getAllUsers : {
            url : `${backendNodeDomain}api/admin/getAllUsers`,
            method : "GET",
            done : "yes",
        },
        getAllMessages : {
            url : `${backendNodeDomain}api/admin/getAllMessages`,
            method : "GET",
            done : "yes",
        },
        getAllCourse : {
            url : `${backendNodeDomain}api/admin/getAllCourses`,
            method : "GET",
            done : "yes",
        },
        addCourse : {
            url : `${backendNodeDomain}api/admin/addCourse`,
            method : "POST",
            done : "yes",
        },
        update : {
            url : `${backendNodeDomain}api/admin/users/:id`,
            method : "PUT",
            done : "yes",
        }
    },
    subscription : {
        url : `${backendNodeDomain}api/Subscription/getSubscription`,
        method : "POST",
        done : "yes",
    },
    upload : {
        url : `${backendPythonDomain}upload`,
        method : "POST",
        done : "yes"
    },
    youtube : {
        url : `${backendPythonDomain}upload_youtube`,
        method : "POST",
        done : "yes"
    },

    dubbing : {
        url : `${backendPythonDomain}dubbing`,
        method : "GET",
        done : "yes"
    },

    getFile : {
        url : `${backendPythonDomain}get_file`,
        method : "GET",
    },

    subtitles : {
        url : `${backendPythonDomain}subtitles`,
        method : "GET",
        done : "yes"
    },

    getSubtitles : {
        url : `${backendPythonDomain}get_subtitles`,
        method : "GET",
        
    }

}

export default SummaryApi