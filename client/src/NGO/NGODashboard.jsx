const NGODashboard = () => {
      const [count, setCount] = useState(0);
      const [donationRequests, setDonationRequests] = useState([]);

      useEffect(() => {
        const fetchedRequests = [
          {
            id: 1,
            category: "Food",
            description: "Urgent need for food donations",
          },
          {
            id: 2,
            category: "Clothing",
            description: "Clothing donations for refugees",
          },
          {
            id: 3,
            category: "Medical",
            description: "Medical supplies urgently needed",
          },
        ];
        setDonationRequests(fetchedRequests);
      }, []);
    return (
    <div>
      <header>
        <h1>NGO Dashboard</h1>
      </header>
      <main>
        <section className="statistics">
          <div>
            <h2>Donors</h2>
            <p>Total Donors: {count}</p>
            <button onClick={() => setCount(count + 1)}>Add Donor</button>
          </div>
        </section>

        {/* Donation Requests Section */}
        <section className="donation-request">
          <h2>Donation Requests</h2>
          {donationRequests.length > 0 ? (
            <ul>
              {donationRequests.map((request) => (
                <li key={request.id}>
                  <h3>{request.category}</h3>
                  <p>{request.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No donation requests found.</p>
          )}
        </section>
      </main>
      <footer>
        <p>Click on logos to learn more about Vite and React!</p>
      </footer>
      </div>
    )
}