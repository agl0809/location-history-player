const fileContent = 'any file content';

function service(JSONFileUrl) {
    console.log('STEP2');
    return new Promise((resolve, reject) => {
        process.nextTick(
            () => resolve(fileContent)
        );
    });
}

export {service};