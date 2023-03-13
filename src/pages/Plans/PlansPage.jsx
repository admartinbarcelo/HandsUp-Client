import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import routeService from "../../services/route.service";
import Navbar from "../../components/Navbar/Navbar";
import "./PlanPage.css";
import PlanImage from "../../assets/plans-page.jpeg";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    routeService.getAllPlans().then((response) => {
      setPlans(response.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="planPage-container">
        <img src={PlanImage} alt="imageHome" />
      </div>
      <div className="plan-container container-page row row-cols-1 row-cols-md-5 g-4 me-5 ms-5 mt-4">
        {plans.map((plan) => (
          <div key={plan._id} className="col">
            <div className="card h-100">
              <img
                src={plan.images}
                className="card-img-top"
                alt={plan.title}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{plan.title}</h5>
                <p className="card-text">{plan.destination}</p>
                <p className="card-text">{plan.toDate}</p>
                <Link to={`/plans/${plan._id}`} className=" btn-details">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
