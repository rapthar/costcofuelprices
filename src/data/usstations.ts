export interface Station {
  CompanyName: string;
  StoreName: string;
  City: string;
  StreetAddress: string;
  Country: string;
  Title: string;
  Zipcode: string | number;
  Address: string;
  StateFull: string;
  Phone: string;
  Hours: string;
  Web: string;
  Latitude: number;
  Longitude: number;
  Warehouse: string;
  Regular: string;
  Premium: string;
  Diesel: string;
  GasPriceTypes: string;
  LastUpdated: string;
  Disclaimer: string;
  PostAuthor: string;
}

export const stations: Station[] = [
  {
    CompanyName: "Costco",
    StoreName: "Issaquah",
    City: "Issaquah",
    StreetAddress: "1801 10Th Ave Nw",
    Country: "United States", 
    Title: "Costco Gas In Issaquah 1801 10Th Ave Nw",
    Zipcode: "98027-5384",
    Address: "1801 10Th Ave Nw Issaquah, WA 98027-5384",
    StateFull: "Washington",
    Phone: "(425) 313-0965",
    Hours: "Mon-Fri. 10:00AM - 08:30PM Sat. 09:30AM - 06:00PM Sun. 10:00AM - 06:00PM",
    Web: "https://www.costco.com/warehouse-locations/issaquah-wa-110.html",
    Latitude: 47.551,
    Longitude: -122.052,
    Warehouse: "Issaquah Warehouse",
    Regular: "$4.26",
    Premium: "$4.80",
    Diesel: "NA",
    GasPriceTypes: "Regular,Premium",
    LastUpdated: "November 11, 2024",
    Disclaimer: "The prices listed here are subject to frequent updates, but may not necessarily match the current price displayed at the pump when making a purchase. All transactions will be conducted at the price indicated on the pumps at the respective Costco locations at the time of purchase.",
    PostAuthor: "info"
  }
];
