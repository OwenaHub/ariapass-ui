
/**
 * Categorizes a list of event data objects by device type (PC or Phone)
 * based on the user_agent string.
 *
 * @param {Array<Object>} data - An array of objects, where each object must have a 'user_agent' property.
 * @returns {Object} An object with the counts of 'pc' and 'phone' devices.
 */
export function categorizeDevices(data: any[]) {
    const deviceCounts = {
        pc: 0,
        phone: 0,
    };

    const mobileRegex = /Mobi|Android|iPhone|iPad|iPod/i;

    for (const record of data) {
        if (record.user_agent) {
            if (mobileRegex.test(record.user_agent)) {
                deviceCounts.phone++;
            } else {
                deviceCounts.pc++;
            }
        }
    }
    return deviceCounts;
}