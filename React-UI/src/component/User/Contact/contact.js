import './contact.css';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
	const form = useRef();
	const [ nameError, setNameError ] = useState('');
	const [ phoneError, setPhoneError ] = useState('');

	const validateForm = () => {
		let valid = true;
		const formData = new FormData(form.current);

		const name = formData.get('from_name');
		if (name.length == 0) {
			setNameError('Name is required');
			valid = false;
		} else if (name.length < 3) {
			setNameError('valid Name is required');
			valid = false;
		} else if (!/^[a-zA-Z\s]*$/.test(name)) {
			setNameError('Name can only contain letters and spaces');
			valid = false;
		} else if (name.length > 30) {
			setNameError('Name is too long');
			valid = false;
		}

		let phoneNumber = formData.get('mobile_number');
		if (phoneNumber.startsWith(+91)) {
			phoneNumber = phoneNumber.substring(2);
		}
		if (phoneNumber.startsWith(0)) {
			phoneNumber = phoneNumber.substring(1);
		}
		if (!phoneNumber) {
			setPhoneError('Phone number is required');
			valid = false;
		} else if (!/^\d{10}$/.test(phoneNumber)) {
			setPhoneError('Phone number must be 10 digits');
			valid = false;
		}
		return valid;
	};

	const sendEmail = (e) => {
		e.preventDefault();

		const valid = validateForm();

		if (valid) {
			const pendingToastId = toast.info("Message Sending...", { autoClose: false });
			emailjs.sendForm('service_6iweohj', 'template_yq85uat', form.current, {
				publicKey: 'fJNjYfFHkKhzjxsR7',
			})
				.then(() => {
					toast.update(pendingToastId, {
						render: "Message Sent Successfully",
						type: "success",
						autoClose: 800
					});
				},
					(error) => {
						toast.update(pendingToastId, {
							render: "Message Not Sent",
							type: "success",
							autoClose: 800
						});
					}
				);
		}
	};

	return (
		<>
			<div className="contact_section" id="contact">
				<div className="container">
					<div className="contact_main">
						<h1 className="request_text">A Call Back</h1>
						<form ref={form} onSubmit={sendEmail}>
							<div className="form-group">
								<input
									type="text"
									className="input"
									placeholder="Enter Name"
									name="from_name"
									required
									onChange={(e => { setNameError('') })}
								/>
								<div className="error">{nameError}</div>
							</div>
							<div className="form-group">
								<input
									type="number"
									className="input"
									placeholder="Phone Number"
									name="mobile_number"
									required
									onChange={(e => { setPhoneError('') })}
								/>
								<div className="error">{phoneError}</div>
							</div>
							<div className="form-group">
								<textarea
									className="massage-box"
									placeholder="Message (optional)"
									rows="5"
									id="comment"
									name="message"
								></textarea>
							</div>
							<button type="submit" value="Send" className="send_btn">
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Contact;
