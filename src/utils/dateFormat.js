/**
 * Allows converting a date to local format
 * @returns 
 */

export const dateFormat = () => {
    const dateTask = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return dateTask.toLocaleDateString('es-ES', options);
}