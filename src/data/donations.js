export const donations = [
  {
    id: 1,
    date: "12 May 2024",
    bloodGroup: "O+",
    location: "City Hospital, Delhi",
    status: "Successful",
    units: 1,
  },
  {
    id: 2,
    date: "10 Feb 2024",
    bloodGroup: "O+",
    location: "Red Cross Blood Bank",
    status: "Successful",
    units: 1,
  },
  {
    id: 3,
    date: "5 Nov 2023",
    bloodGroup: "O+",
    location: "Life Care Hospital",
    status: "Successful",
    units: 1,
  },
  {
    id: 4,
    date: "20 Aug 2023",
    bloodGroup: "O+",
    location: "City Hospital, Delhi",
    status: "Successful",
    units: 1,
  },
  {
    id: 5,
    date: "14 Mar 2023",
    bloodGroup: "O+",
    location: "Metro Hospital, Delhi",
    status: "Successful",
    units: 1,
  },
  {
    id: 6,
    date: "2 Dec 2022",
    bloodGroup: "O+",
    location: "Red Cross Blood Bank",
    status: "Cancelled",
    units: 0,
  },
  {
    id: 7,
    date: "18 Jul 2022",
    bloodGroup: "O+",
    location: "Care Hospital, Delhi",
    status: "Successful",
    units: 1,
  },
];

export const donationLocations = [...new Set(donations.map((d) => d.location))];
export const donationStatuses = [...new Set(donations.map((d) => d.status))];
