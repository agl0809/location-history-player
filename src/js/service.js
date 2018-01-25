function service(fileUrl) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                const resp = request.responseText;
                if (resp.error) {
                    reject(resp);
                } else {
                    resolve(resp);
                }
            }
        };
        request.open('GET', fileUrl, true);
        request.send(null);
    });
}

export {service};