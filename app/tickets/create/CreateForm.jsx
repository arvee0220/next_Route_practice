"use client";

import { useRouter } from "next/navigation";
import { useReducer } from "react";

const INITIAL_STATE = {
	title: "",
	body: "",
	priority: "low",
	isLoading: false,
};

const ticketReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "set_title":
			return { ...state, title: payload };
		case "set_body":
			return { ...state, body: payload };
		case "set_priority":
			return { ...state, priority: payload };
		case "setLoading":
			return { ...state, isLoading: payload };
		default:
			throw new Error(`Unknown action: ${type}`);
	}
};

function CreateForm() {
	const [state, dispatch] = useReducer(ticketReducer, INITIAL_STATE);
	const { title, body, priority, isLoading } = state;
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		dispatch({ type: "setLoading", payload: true });

		const newTicket = { title, body, priority, user_email: "rowellverdejo@gmail.com" };

		const res = await fetch("http://localhost:4000/tickets", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTicket),
		});

		if (res.status === 201) {
			router.refresh();
			router.push("/tickets");
		}

		dispatch({ type: "setLoading", payload: false });
	};

	return (
		<form className="w-1/2" onSubmit={handleSubmit}>
			<label>
				<span>Title:</span>
				<input
					required
					type="text"
					onChange={(e) => dispatch({ type: "set_title", payload: e.target.value })}
					value={title}
				/>
			</label>
			<label>
				<span>Body:</span>
				<textarea
					required
					onChange={(e) => dispatch({ type: "set_body", payload: e.target.value })}
					value={body}
				/>
			</label>
			<label>
				<span>Priority:</span>
				<select
					onChange={(e) => dispatch({ type: "set_priority", payload: e.target.value })}
					value={priority}
				>
					<option value="low">Low Priority</option>
					<option value="medium">Medium Priority</option>
					<option value="high">High Priority</option>
				</select>
			</label>
			<button className="btn-primary" disabled={isLoading}>
				{isLoading ? <span>Adding...</span> : <span>Add Ticket</span>}
			</button>
		</form>
	);
}

export default CreateForm;
