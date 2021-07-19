const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedhelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30 + 10);
    const camp = new Campground({
      author: "60ec73d679da7218443546c7",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime expedita consequatur atque, doloremque praesentium soluta quia et? Provident alias quae minus ipsam praesentium quas sequi vitae nesciunt, nisi, doloribus porro?",
      price,
      geometry: { type: "Point", coordinates: [-133.1331, 47.0202] },
      images: [
        {
          url: "https://res.cloudinary.com/doejbkkcn/image/upload/v1626466017/YelpCamp/ctcnayhqunrfcofxjmnt.jpg",
          filename: "YelpCamp/ctcnayhqunrfcofxjmnt",
        },
        {
          url: "https://res.cloudinary.com/doejbkkcn/image/upload/v1626382332/YelpCamp/uiuu1cnsxiyhvsc3n77v.jpg",
          filename: "YelpCamp/uiuu1cnsxiyhvsc3n77v",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
