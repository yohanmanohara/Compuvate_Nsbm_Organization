import React, { useEffect, useState } from "react";

import Nav from '../components/commen/Nav';
// import Title from '../components/commen/Title';
import Slide from '../components/home/Slide.js';
import FacilitiesList from '../components/home/FacilitiesList.js';
import DetailsList from '../components/home/DetailsList.js';
import EventList from '../components/home/EventList.js';
import UpcomingEventList from '../components/home/UpcomingEventList.js';
import Branch from '../components/home/Branch.js';
import Success from '../components/home/Success.js';
import Awards from '../components/home/Awards.js';
import Review from '../components/home/Review.js';
import Footer from '../components/commen/Footer.js'


import hero1 from "../images/hero/image1.jpg";
import hero2 from "../images/hero/image2.jpg";
import hero3 from "../images/hero/image3.jpg";


import awordsIcon from '../images/theme/awords.png'
import enrollmentsIcon from '../images/theme/enrollments.png'
import schoolsIcon from '../images/theme/schools.png'
import serviceIcon from '../images/theme/service.png'
import studentIcon from '../images/theme/student.png'
import teachersIcon from '../images/theme/teachers.png'

import branch1 from '../images/branch/image1.jpg'
import branch2 from '../images/branch/image2.jpg'
import branch3 from '../images/branch/image3.jpg'

import award1 from '../images/Awards/1.png';
import award2 from '../images/Awards/2.png';
import award3 from '../images/Awards/3.png';
// import award4 from '../images/Awards/4.png';

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { eventContent } from "../constants/data.js";
import useAxios from "../hooks/useAxios"; // Import the custom Axios hook
import { toast } from "react-hot-toast";
import { icon } from "leaflet";
import { Loader2 } from "lucide-react";


export default function Home() {
  const { fetch, loading } = useAxios();
  const [isloading, setIsloading] = useState(true);
  const [slideContent, setSlideContent] = useState([]);
  const [FacilitiesContent, setFacilitiesContent] = useState([]);
  const [schoolInfo, setSchoolInfo] = useState([]);
  const [branchesList, setBranches] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [awards, setAwards] = useState([]);

  const getSliders = async () => {
    try {
      const response = await fetch({
        method: "GET",
        url: "/api/sliders",
      });
      // console.log(response.data);

      if (response.data.success) {
        setSlideContent(response.data.data);
      }

    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }

  const getFacilities = async () => {
    try {
      const response = await fetch({
        method: "GET",
        url: "/api/facilities",
      });
      if (response.data.success) {
        // console.log(response.data.facilities);
        setFacilitiesContent(response.data.data.facilities);
      }

    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }

  const getSchoolInfo = async () => {
    try {
      const { data } = await fetch({
        url: "/api/school-info",
        method: "GET",
      });
      if (data.success) {
        // console.log(data.data);
        setSchoolInfo(data.data.map((item) => {
          return {
            ...item,
            icon: item.title === "Students" ? studentIcon : item.title === "Teachers" ? teachersIcon : item.title === "Year in Service" ? serviceIcon : item.title === "School Island Wide" ? schoolsIcon : item.title === "Annual Enrollments" ? enrollmentsIcon : awordsIcon,
          };
        }));
      } else {
        throw new Error(data.message || "Failed to fetch school info");
      }
    } catch (error) {
      console.error("Error fetching school info:", error);
      toast.error("Failed to fetch school info. Please try again.");
    }
  }

  const fetchBranches = async () => {
    try {
      const { data: response } = await fetch({
        url: "/api/branches",
        method: "GET",
      });

      if (response.success) {
        // console.log(response.data.branches);
        setBranches(response.data.branches);
      } else {
        toast.error(response.data?.message || "Failed to fetch branches");
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
      toast.error("An error occurred while fetching branches.");
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await fetch({
        url: "/api/reviews",
        method: "GET",
      });
      if (data.success) {
        // console.log(data.data.reviews);
        setReviews(data.data.reviews);
      } else {
        throw new Error(data.error || "Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews");
    }
  };

  const fetchEvents = async () => {
    try {
      const { data: response } = await fetch({
        url: "/api/events?eventType=upcoming",
        method: "GET",
      });

      if (response.success) {
        console.log(response.data.events);
        setUpcomingEvents(response.data.events);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error("An error occurred while fetching events.");
    }
  };

  const fetchAwards = async () => {
    try {
      const response = await fetch({
        url: "/api/awards",
        method: "GET",
      });

      if (response.data?.success) {
        console.log(response.data.data.awards);
        setAwards(response.data.data.awards);
      } else {
        toast.error(response.data?.message || "Failed to fetch awards");
      }
    } catch (err) {
      toast.error("An error occurred while fetching awards.");
    }
  };

  useEffect(() => {
    getSliders();
    getFacilities();
    getSchoolInfo();
    fetchBranches();
    fetchReviews();
    fetchEvents();
    fetchAwards();
  }, []);


  // const slideContent = [
  //   {
  //     image: '/img/gg/8.jpg',
  //     h1: 'Continuous Improvement',
  //     p: 'Our mission is to make our students self-confident, enhance their thinking skills and make them into good human beings.'
  //   },
  //   {
  //     image: '/img/gg/2.jpg',
  //     h1: 'Quality Education',
  //     p: 'We provide quality education to students from pre-primary to Advanced level with both local and international curricula.'
  //   },
  //   {
  //     image: '/img/gg/3.jpg',
  //     h1: 'Global Role Model',
  //     p: 'Our vision is to become a global role model for teaching and learning.'
  //   }
  // ];

  // const FacilitiesContent = [
  //   {
  //     id: 1,
  //     title: 'Pre-Primary Education',
  //     description: 'Nurturing young minds with Oxford Print syllabus and local competency activities',
  //     image: '/img/11.jpg'
  //   },
  //   {
  //     id: 2,
  //     title: 'Primary Education',
  //     description: 'Comprehensive primary education following Edexcel curriculum',
  //     image: '/img/22.jpeg'
  //   },
  //   {
  //     id: 3,
  //     title: 'Secondary Education',
  //     description: 'Advanced secondary education with both local and international syllabi',
  //     image: '/img/33.jpg'
  //   },
  //   {
  //     id: 4,
  //     title: 'Cambridge ESOL',
  //     description: 'Official Cambridge Assessment ESOL examination center',
  //     image: '/img/44.jpeg'
  //   },
  // ];

  // const details = [
  //   {
  //     id: 1,
  //     icon: studentIcon,
  //     count: 33,
  //     title: 'First Batch Students',
  //     description: 'Started with 33 dedicated students across three classrooms when we opened our doors in January 2017.',
  //   },
  //   {
  //     id: 2,
  //     icon: awordsIcon,
  //     count: 4,
  //     title: 'Campus Locations',
  //     description: 'Growing network of campuses in Negombo, Anuradhapura, Chilaw and Anamaduwa.',
  //   },
  //   {
  //     id: 3,
  //     icon: teachersIcon,
  //     count: 3,
  //     title: 'Curriculum Options',
  //     description: 'Offering Local, Edexcel and Cambridge syllabi to cater to diverse educational needs.',
  //   },
  //   {
  //     id: 4,
  //     icon: enrollmentsIcon,
  //     count: 2,
  //     title: 'Main Branches',
  //     description: 'Main college branches established in Bangadeniya (Chilaw) and Anamaduwa.',
  //   },
  //   {
  //     id: 5,
  //     icon: serviceIcon,
  //     count: 8,
  //     title: 'Years of Excellence',
  //     description: 'Providing quality education since 2017 under the leadership of Dr. B.A.K.R. Tharanga.',
  //   },
  //   {
  //     id: 6,
  //     icon: schoolsIcon,
  //     count: 80,
  //     title: 'Attendance Target',
  //     description: 'We maintain high standards with a minimum 80% attendance requirement for all students.',
  //   }
  // ];


  // const eventContent = [
  //   {
  //     id: 1,
  //     image: hero1,
  //     title: 'Clildren Day',
  //     //Clildren Day description
  //     description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam sunt delectus cum molestiae. Deleniti dicta sit pariatur fugit asperiores praesentium!',
  //   },
  //   {
  //     id: 2,
  //     image: hero2,
  //     title: 'Lorem Ipsum is simply',
  //     description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam sunt delectus cum molestiae. Deleniti dicta sit pariatur fugit asperiores praesentium!',
  //   },
  // ];


  // const branchesList = [
  //   {
  //     name: 'Chilaw (Bangadeniya)',
  //     image: '/img/gg/6.jpg'
  //   },
  //   {
  //     name: 'Anamaduwa',
  //     image: '/img/gg/4.jpg'
  //   },
  //   {
  //     name: 'Negombo',
  //     image: '/img/gg/5.jpg'
  //   },
  //   {
  //     name: 'Anuradhapura',
  //     image: '/img/gg/7.jpg'
  //   }
  // ];

  const successItems = [
    {
      title: 'Cambridge ESOL Partnership',
      description: 'Official partnership with Cambridge Assessments for ESOL examinations conducted on school premises.',
      imgSrc: "/students.jpg",
      path: 'success'
    },
    {
      title: 'University Affiliations',
      description: 'Affiliated with Azteca University (UGC Recognized) and Open International University for Complementary Medicines.',
      imgSrc: "/img/88.jpeg",
      path: 'success'
    },
    {
      title: 'Competency Based Education',
      description: 'Implementation of modern competency-based education focusing on individual student mastery and progress.',
      imgSrc: "/img/99.jpeg",
      path: 'success'
    }
  ];

  const awardItems = [
    {
      imgSrc: award1,
      title: 'Awards and Recognitions',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In temporibus inventore tenetur consectetur rem odio, voluptas repellat accusantium, eum eius odit officia itaque vitae suscipit similique harum. Perferendis, esse autem.'
    },
    {
      imgSrc: award2,
      title: 'Awards and Recognitions',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In temporibus inventore tenetur consectetur rem odio, voluptas repellat accusantium, eum eius odit officia itaque vitae suscipit similique harum. Perferendis, esse autem.'
    },
    {
      imgSrc: award3,
      title: 'Awards and Recognitions',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In temporibus inventore tenetur consectetur rem odio, voluptas repellat accusantium, eum eius odit officia itaque vitae suscipit similique harum. Perferendis, esse autem.'
    }
  ];

  const reviewItems = [
    {
      name: 'Dr. B.A.K.R. Tharanga',
      role: 'Director',
      profileImage: "/person.jpg",
      rating: 5,
      description: 'Cambridge certified lecturer, Bachelor of Education Professional, and Honorary Doctor of Philosophy leading our institution since 2017.'
    },
    {
      name: 'Mrs. M.S.W. Fernando',
      role: 'Co-Founder and Group Principal',
      profileImage: "/person.jpg",
      rating: 5,
      description: 'Trained teacher from ITTA and Cambridge certified Lecturer, dedicated to maintaining high educational standards.'
    }
  ];

  if (loading) {
    return (
      <>
        <Nav />
        <div className=" flex justify-center items-center w-full pt-16">
          <Loader2 className="animate-spin mr-3" />
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <Slide content={slideContent} />
      <FacilitiesList facilitiesData={FacilitiesContent} />
      <DetailsList details={schoolInfo} />
      <UpcomingEventList
        eventItems={upcomingEvents}
      />
      {/* {UpcomingEventContent.length >= 3 ? (
        <UpcomingEventList
          eventItems={UpcomingEventContent}
        />
      ) : (
        ""
      )} */}

      {/* <EventList eventItems={eventContent}></EventList> */}
      <Branch branches={branchesList}></Branch>
      <Success successItems={successItems}></Success>
      {awards.length > 0 && <Awards awardItems={awards}></Awards>}
      {/* <Awards awardItems={awardItems}></Awards> */}
      <Review reviewItems={reviews}></Review>
      <Footer />
    </>
  );
}
