import axios from "axios";
import { useEffect, useState } from "react";
import { userUrl } from "../../../app.url";
import { useNavigate } from "react-router-dom";
import './userDetail.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiSearch } from "react-icons/ci";

function UserDetails() {
	let serialNo = 0;
	const navigate = useNavigate();
	const [ userData, setUserData ] = useState([]);
	const [ search, setSearch ] = useState('')

	const changeStatus = (id, status) => {
		if (status == 1) {
			let updateDetails = { condition_obj: { _id: id }, content_obj: { status: 0 } };
			axios.patch(userUrl + "update", updateDetails).then((response) => {
			}).catch((error) => {
				console.log(error);
			});
		} else if (status == 0) {
			let updateDetails = { condition_obj: { _id: id }, content_obj: { status: 1 } };
			axios.patch(userUrl + "update", updateDetails).then((response) => {
			}).catch((error) => {
				console.log(error);
			});
		}
	};

	const deleteData = (id) => {

		const isConfirmed = window.confirm("Are you sure you want to delete?");

		if (isConfirmed) {
			const deleteUser = { data: { _id: id } };
			axios.delete(userUrl + "delete", deleteUser)
				.then((response) => {
				})
				.catch((error) => {
					console.log(error);
				});
			toast.success('User Deleted Successfully', {
				autoClose: 600,
			});
		}
	};


	let searchItem = userData.filter((item) => {
		if (search === '') {
			return item;
		} else if (item.name.toLowerCase().includes(search.toLowerCase())) {
			return item;
		} else if (item.email.toLowerCase().includes(search.toLowerCase())) {
			return item;
		} else if (item.phone.includes(search)) {
			return item;
		} else if (item.date.includes(search)) {
			return item;
		}
	})

	useEffect(() => {
		axios.get(userUrl + "fetch?role=user")
			.then((response) => {
				setUserData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [ changeStatus ], [ deleteData ]);


	return (
		<>
			<div className="user-details container pt-20 ">
				{/* <h3 className="underline flex justify-center">User Details</h3> */}
				<div className="UserDetailsSearchBar">
					<input type="text" placeholder="Search Users......" onChange={e => setSearch(e.target.value)} />
					<span className="searchIcon"><CiSearch size={25} /></span>
				</div>
				<div className="userList-table">
					<table hoverable className="text-center m-auto">
						<tr>
							<th>Serial No.</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>password</th>
							<th className="date">Date / Time</th>
							<th className="w-32">Status</th>
							<th>Action</th>
						</tr>
						{searchItem.map((value) => (
							<tr className="">
								<td className="">{++serialNo}</td>
								<td>{value.name}</td>
								<td>{value.email}</td>
								<td>{value.phone}</td>
								<td>{value.password}</td>
								<td >{value.date} / {value.time}</td>
								<td>
									<div
										className="form-check"
										onClick={() => {
											changeStatus(value._id, value.status);
										}}
									>
										<label
											className="form-check-label status"
											style={{ cursor: "pointer", width: "60px" }}
										>
											<input
												style={{ cursor: "pointer" }}
												className="form-check-input"
												type="checkbox"
												role="switch"
												checked={value.status === 1}
												onChange={() => changeStatus(value._id, value.status)}
											/>

											{value.status == 1 && <font color="green"> Active</font>}
											{value.status == 0 && <font color="gray"> Inactive</font>}
										</label>
									</div>
								</td>
								<td
									className=""
									style={{ cursor: "pointer", color: "red" }}
									onClick={() => { deleteData(value._id); }}>
									delete
								</td>
							</tr>
						))}
					</table>
				</div>
			</div>
		</>
	);
}
export default UserDetails;
