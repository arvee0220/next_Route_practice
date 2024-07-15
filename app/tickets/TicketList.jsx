import TicketCard from "../components/TicketCard";

const getTickets = async () => {
	const res = await fetch("http://localhost:4000/tickets", {
		next: {
			revalidate: 0,
		},
	});

	return res.json();
};

async function TicketList() {
	const tickets = await getTickets();

	return (
		<>
			{tickets.map((ticket) => (
				<TicketCard key={ticket.id} {...ticket} />
			))}
			{tickets.length === 0 && <p className="text-center">There are no open tickets.</p>}
		</>
	);
}

export default TicketList;
