import {toRaw} from "vue";

function showNotification(notificationState, notification) {
    notificationState.push(notification)
    setTimeout(() => {
        const index = notificationState.findIndex(element => toRaw(element) === notification);
        notificationState.splice(index, 1);
    }, 10000);
}

export { showNotification }
