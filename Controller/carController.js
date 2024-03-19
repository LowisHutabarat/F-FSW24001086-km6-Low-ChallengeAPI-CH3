
const fs = require("fs");


const cars = JSON.parse(fs.readFileSync(`${__dirname}/../Data/cars.json`));

const pingServer = (req, res, next) => {
    console.log("Ping success");
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

const updateCarsData = (req,res) =>{
    const id = req.params.id
    const car = cars.find((car) => car.id === id)
    const carIndex = cars.findIndex((car) => car.id === id)
    if(!car){
        return res.status(404).JSON({
            status: "fail",
            message: `Mobil dengan ID : ${id} tidak ada`
        });
    }
    cars[carIndex] = {...cars[carIndex], ...req.body}
    fs.writeFile(`${__dirname}/Data/cars.json`, JSON.stringify(cars), err => {
        res.status(200).json({
            status: "success",
            message: "Kelazz",
            data:{
                car: car[carIndex],
                car,
            }
        });
    });
};


const deleteCarsData = (req,res) =>{
    const id = req.params.id
    const car = cars.find((car) => car.id === id)
    const carIndex = cars.findIndex((car) => car.id === id)
    if(!car){
        return res.status(404).json({
            status: "fail",
            message: `Mobil dengan ID : ${id} tidak ada`
        });
    }
    cars.splice(carIndex, 1);
    fs.writeFile(`${__dirname}/Data/cars.json`, JSON.stringify(cars), err => {
        res.status(200).json({
            status: "success",
            message: "The data has gone"
        });
    });
}

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