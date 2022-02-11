function getColorByStatus(status) {
  console.log('status', status)
    const colors = {
        'pending': 'warning',
        'processing': 'primary',
        'rejected': 'error',
        'cancelled': 'error',
        'finalized': 'success',
        'dispatched': 'success',
        'completed': 'success',
        'passed': 'success',
        'approved': 'success',
    }

    let color;
    if (status.toLowerCase() in colors) {
        color = colors[`${status.toLowerCase()}`];
    } else {
        color = 'grey';
    }

    return color;
}

export default {
    getColorByStatus
}
