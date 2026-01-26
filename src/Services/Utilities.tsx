const formateDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { year: 'numeric' as const, month: 'short' as const };
    return date.toLocaleString('en-us', options);
}

const timeAgo = (time: string) => {
    const now = new Date();
    const postDate = new Date(time);

    const diff = now.getTime() - postDate.getTime();

    if (diff < 0) return "just now";

    const seconds = Math.floor(diff / 1000);
    const minute = Math.floor(seconds / 60);
    const hours = Math.floor(minute / 60);
    const days = Math.floor(hours / 60);
    const months = Math.floor(days / 30);
    const year = Math.floor(months / 12);

    if (seconds < 60) {
        return `${seconds} seconds ago`
    } else if (minute < 60) {
        return `${minute} minutes ago`
    } else if (hours < 24) {
        return `${hours} hours ago`
    } else if (days < 30) {
        return `${days} days ago`
    } else if (months < 12) {
        return `${months} months ago`
    } else {
        return `${year} year  ago`
    }
}

const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}

const formatInterviewTime = (dateString: any) => {
    const date = new Date(dateString);


    return date.toLocaleString("en-US", {

        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true

    });
}

const openBase64PDF =(base64 : string)=> {
    // Remove metadata if present
    const cleanedBase64 = base64.includes(",")
        ? base64.split(",")[1]
        : base64;

    const byteCharacters = atob(cleanedBase64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, "_blank");

    // cleanup
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
}


export { formateDate, timeAgo, getBase64, formatInterviewTime , openBase64PDF }