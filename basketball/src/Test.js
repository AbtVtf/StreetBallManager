
const Test = () => {
    const player = () => {
        let url = '13f25d10-9630-11ec-9cd9-f3be77a58b05'
        let info

        fetch('http://localhost:8000/players/' + url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log("player fetched")
                info = data
                info.firstName = 'abt '
                info.isInTeam = false
            })

        fetch('http://localhost:8000/players/' + url, {
            method: 'DELETE'
        })
        console.log("player deleted")


        setTimeout(() => {
            fetch('http://localhost:8000/players', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info)
            })
            console.log("player added")

        }, 1000);

    }







    return (
        <div>
            <button onClick={player}>press</button>
        </div>
    );
}

export default Test;