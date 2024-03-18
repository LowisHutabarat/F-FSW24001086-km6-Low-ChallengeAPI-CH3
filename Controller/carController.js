
const fs = require("fs");


const cars = JSON.parse(fs.readFileSync(`${__dirname}/../Data/cars.json`));

const pingServer = (req, res, next) => {
    res.json({ message: "ping successfully" });
};

const lengthCarsData = (req, res, next) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: "success",
        totalData: cars.length,
        requestAt : req.requestTime,
        Data: {
            cars,
        },
    });
};


const getCarsById = (req, res, next) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);

    if (!car) {
        return res.status(404).json({
            status: "failed",
            message: `Mobil dengan ID : ${id} tidak ditemukan`,
        });
    }

    res.status(200).json({
        status: "success",
        Data: {
            car,
        },
    });
};

const updateCarsData =  (req, res, next) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);

    if (!car) {
        return res.status(404).json({
            status: "failed",
            message: `Mobil dengan ID : ${id} tidak ditemukan`,
        });
    }

    res.status(200).json({
        status: "success,i gotchu!",
        Data: {
            car,
        },
    });
};



const deleteCarsData = (req, res) => {
    const id = req.params.id;

    console.log("Deleting Mobil with ID:", id);

    const carIndex = cars.findIndex(car => car.id === id);

    if (carIndex === -1) {
        console.log("Car not found with ID:", id);
        return res.status(404).json({
            status: "success",
            message: `Mobil dengan ID : ${id} tidak ditemukan`,
        });
    }


    console.log("Cars array before deletion:", cars);


    cars.splice(carIndex, 1);

    console.log("cars array after deletion:", cars);

    // Writing updated data back to file
    fs.writeFile(`${__dirname}/Data/cars.json`, JSON.stringify(cars), (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).json({
                status: "error",
                message: "Fail to save data",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Success to delete data",
            data: null
        });
    });
};

const newCarsData = (req, res) => {
    const newCars = req.body;
    cars.push(newCars);

    fs.writeFile(`${__dirname}/Data/cars.json`, JSON.stringify(cars), (err) => {
        console.log("create new Cars",newCars)
        res.status(201).json({
            status: 'success',
            data: {
                car: newCars,
            },
        });
    });
};


module.exports = {
    pingServer,
    lengthCarsData,
    getCarsById,
    updateCarsData,
    deleteCarsData,
    newCarsData,
}