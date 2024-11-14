import Car from '../models/Car.js';

export const createCar = async (req, res) => {
    const { title, description, tags, carType, company, dealer, images } = req.body;
    const userId = req.user.id;

    try {
        const newCar = new Car({
            title,
            description,
            tags,
            carType,
            company,
            dealer,
            images,
            user: userId,
        });

        await newCar.save();
        res.status(201).json({ message: 'Car Created Successfully', car: newCar });
    } catch (error) {
        res.status(500).json({ message: 'Car Creation Server error', error });
    }
}

export const listCars = async (req, res) => {
    const userId = req.user.id;
    try {
        const cars = await Car.find({ user: userId });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'listCars server error', error });
    }
};

export const listAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'listCars server error', error });
    }
};

export const getCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ car });
    } catch (error) {
        res.status(500).json({ message: 'getCar Server error', error });
    }
};

export const updateCar = async (req, res) => {
    const { id } = req.params;
    const { title, description, tags, carType, company, dealer, images } = req.body;
    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        if (car.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this car detail' });
        }
        car.title = title || car.title;
        car.description = description || car.description;
        car.tags = tags || car.tags;
        car.carType = carType || car.carType;
        car.company = company || car.company;
        car.dealer = dealer || car.dealer;
        car.images = images || car.images;

        await car.save();
        res.status(200).json({ message: 'Car updated successfully', car });
    } catch (error) {
        res.status(500).json({ message: 'UpdateCar Server error', error });
    }
}

export const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        if (car.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this car' });
        }

        await Car.findByIdAndDelete(id);
        res.status(200).json({ message: 'Car deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'deleteCar Server error', error });
    }
}

export const searchCars = async (req, res) => {
    const { query } = req.query;
    try {
        const searchRegex = new RegExp(query, 'i');

        const cars = await Car.find({
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { tags: searchRegex },
            ],
        });

        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: ' Search server error', error });
    }
};



