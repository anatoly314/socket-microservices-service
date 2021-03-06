let spaceport = {
    launchShip: function (data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(data);

                let responseObject = {
                    uuid: data.uuid,
                    shipname: data.body.shipname,
                    status: "LAUNCHED"
                }

                return resolve(responseObject);
            }, 10);
        })

    }
}

module.exports = spaceport;