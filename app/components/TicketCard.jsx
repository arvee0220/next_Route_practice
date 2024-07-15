import Link from "next/link";

function TicketCard({ ...ticket }) {
	const { id, title, body, priority } = ticket;

	return (
		<div key={id} className="card my-5">
			<Link href={`/tickets/${id}`}>
				<h3>{title}</h3>
				<p>{body.slice(0, 200)}...</p>
				<div className={`pill ${priority}`}>{priority} priority</div>
			</Link>
		</div>
	);
}

export default TicketCard;
