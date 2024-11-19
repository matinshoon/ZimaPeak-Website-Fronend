import React from 'react';
import { ReactComponent as GoogleIcon } from '../../images/googlelogo.svg'; // Add a Google Calendar SVG icon in your assets
import { ReactComponent as AppleIcon } from '../../images/applelogo.svg';   // Add an Apple Calendar SVG icon in your assets

const Confirmation = ({ formData, darkMode }) => {
    const generateGoogleCalendarUrl = () => {
        const { appointmentDate, appointmentTime, full_name } = formData;
        const startDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
        const endDateTime = new Date(startDateTime);
        endDateTime.setHours(startDateTime.getHours() + 1);

        const startDate = startDateTime.toISOString().replace(/-|:|\.\d+/g, '');
        const endDate = endDateTime.toISOString().replace(/-|:|\.\d+/g, '');

        return `https://calendar.google.com/calendar/r/eventedit?text=Appointment+with+Zimapeak&dates=${startDate}/${endDate}&details=Appointment+for+${full_name}&location=${formData.email}`;
    };

    const generateIcal = () => {
        const { appointmentDate, appointmentTime } = formData;
        const startDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
        const endDateTime = new Date(startDateTime);
        endDateTime.setHours(startDateTime.getHours() + 1);

        const startDate = startDateTime.toISOString().replace(/-|:|\.\d+/g, '');
        const endDate = endDateTime.toISOString().replace(/-|:|\.\d+/g, '');

        const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Appointment with Zimapeak
DESCRIPTION:Appointment with Zimapeak
LOCATION:${formData.email}
DTSTART:${startDate}
DTEND:${endDate}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icalContent], { type: 'text/calendar' });
        return URL.createObjectURL(blob);
    };

    const displayDate = () => {
        const { appointmentDate, appointmentTime } = formData;
        const startDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
        return startDateTime.toLocaleString();
    };

    return (
        <div className={`rounded-lg ${darkMode ? 'text-white' : 'text-dark'}`}>
            <h3 className="text-2xl font-semibold mb-4">Booking Confirmation</h3>
            <p className="text-lg mb-4">Thank you for booking with us! Here's a summary of your appointment:</p>
            <ul className="list-none mb-6">
                <li><strong>Name:</strong> {formData.full_name}</li>
                <li><strong>Email:</strong> {formData.email}</li>
                <li><strong>Phone:</strong> {formData.phone}</li>
                <li><strong>Website:</strong> {formData.website}</li>
                <li><strong>Appointment Date:</strong> {displayDate()}</li>
            </ul>

            {/* Google Calendar Button */}
            <h1 className="text-lg font-semibold mb-4">Add Event to your calendar</h1>
            <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button"
                aria-label="Add to Google Calendar"
            >
                <GoogleIcon className="icon" />
            </a>

            {/* iCal Button */}
            <a
                href={generateIcal()}
                download="appointment.ics"
                className="icon-button"
                aria-label="Add to Apple Calendar"
            >
                <AppleIcon className="icon" />
            </a>

            <style jsx>{`
                .icon-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: 2px solid var(--primary); /* Primary color */
                    margin: 0 10px;
                }

                .icon {
                    width: 24px;
                    height: 24px;
                    fill: ${darkMode ? 'white' : 'black'};
                }
            `}</style>
        </div>
    );
};

export default Confirmation;