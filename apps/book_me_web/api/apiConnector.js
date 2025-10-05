import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const sendMessage = function (method, params) {
    return new Promise(function (resolve, reject) {
        // Get API URL from environment variables with fallback
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
        var url = `${apiUrl}/${method}`;
        console.log('API URL:', url);
        const { body, token } = params;

        var headers = {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        };


        if (params.user && params.user.token) {
            headers["Authorization"] = params.user.token;
            var lang = params.user && params.user._language ? `${params.user._language}-${params.user._language.toUpperCase()}` : "en"
            if (!params.user.language || !params.user.language) {
                lang = localStorage.getItem("active_language") || "en";
            }
            headers["Language"] = lang;
        }
        else { //in case of registration
            const lang = localStorage.getItem("active_language") || "en";
            headers["Language"] = lang;
        }

        var result = fetch(url, {
            //api allowed verb is POST
            method: 'POST',
            //headers
            headers: headers,
            //body
            body: body ? JSON.stringify(body) : null,

        })
            .then(r => {
                if (r.headers.has('X-Auth-Token')) {
                    const _user = JSON.parse(localStorage.getItem('user'));
                    _user.token = r.headers.get("X-Auth-Token");
                    localStorage.setItem('user', JSON.stringify(_user));
                }
                
                // Check for 401 status (Unauthorized)
                if (r.status === 401) {
                    return r.json().then(data => {
                        if (data.redirectLogin) {
                            localStorage.removeItem("user");
                            window.location.href = "/login";
                            return Promise.reject(new Error('Unauthorized - redirecting to login'));
                        }
                        return data;
                    });
                }
                
                return r.json();
            })
            .then((data) => {
                resolve(data);

                if (data.error) {
                    withReactContent(Swal).fire({
                        title: "ERROR",
                        icon: "error",
                        text: data.error,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        showCloseButton: true,
                    });

                    if (data.removeToken) {
                        localStorage.removeItem("user");
                        window.location.href = "/login";
                    }
                }

                // Handle redirectLogin even if there's no error field
                if (data.redirectLogin) {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                }
            })
            .catch(error => {
                if (!params.silentMode) {
                    withReactContent(Swal).fire({
                        title: "ERROR",
                        icon: "error",
                        text: "error connecting the api",
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        showCloseButton: true,
                    });
                }
                reject(error);
            });
    });
}

export { sendMessage }; 