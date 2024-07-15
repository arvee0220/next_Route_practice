import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const res = await fetch(`http://localhost:4000/tickets`);
	const tickets = await res.json();

	return tickets.map((ticket) => ({
		id: ticket.id,
	}));
}

const getTicket = async (id) => {
	const res = await fetch(`http://localhost:4000/tickets/${id}`, {
		next: {
			revalidate: 60,
		},
	});

	if (!res.ok) {
		notFound();
	}

	return res.json();
};

async function TicketDetails({ params }) {
	const { id } = params;
	const ticket = await getTicket(id);
	const { title, user_email, body, priority } = ticket;

	return (
		<main>
			<nav>
				<h2>Ticket Details</h2>
			</nav>
			<div className="card">
				<h3>{title}</h3>
				<small>Created by {user_email}</small>
				<p>{body}</p>
				<div className={`pill ${priority}`}>{priority} priority</div>
			</div>
		</main>
	);
}

export default TicketDetails;
