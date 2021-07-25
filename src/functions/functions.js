const fadeOutAndDelete = (id, setSuccess, after = null, time = 1000) => {
    setSuccess(true);
    setTimeout(() => {
        let element = document.getElementById(id);
        if(element !== null) {
            element.classList.add('fade-out');
            setTimeout(() => {
                setSuccess(false);
            }, 500);
            if(after !== null) {
                after();
            }
        }
    }, time);
}

export default fadeOutAndDelete;