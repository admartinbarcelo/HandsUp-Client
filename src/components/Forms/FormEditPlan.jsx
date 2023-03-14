import { useContext, useState } from "react"
import routeService from "../../services/route.service"
import { useNavigate, Link } from "react-router-dom"
import { uploadImage } from "../../services/upload.service"
import { AuthContext } from "../../context/auth.context"
import Calendar from '../Calendar'
import MyCkEditor from "../../inputEditor/MyCkEditor";

export default function FormEditPlan({ planId }) {

    const { user } = useContext(AuthContext)

    const [currentUser, setCurrentUser] = useState(null)

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState("")
    const [toDate, settoDate] = useState("")
    const [fromDate, setfromDate] = useState("")
    const [destination, setDestination] = useState("")
    const [selectedRange, setSelectedRange] = useState('');

    const handleRangeChange = (selectedRange, fromDate, toDate) => {
        setSelectedRange(selectedRange);
        setfromDate(fromDate);
        settoDate(toDate);
    }

    const descriptionHandler = (content) => {
        setDescription(content)
        console.log(description)
    }

    const handleFileUpload = (e) => {


        const uploadData = new FormData();
        uploadData.append("images", e.target.files[0]);



        uploadImage(uploadData)
            .then(response => {
                console.log("response is: ", response);
                // response carries "fileUrl" which we can use to update the state
                setImages(response.fileUrl);
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        routeService.updateOnePlan(planId, { title, description, images, fromDate, toDate, destination })
            .then(result => {
                setTitle("")
                setDescription("")
                setImages("")
                settoDate("")
                setfromDate("")
                setDestination("")
                navigate(`/plans/${planId}`)
            })
            .catch(err => console.log(err))

    }

    const deleteHandler = (planId) => {
        routeService.deletePlan(planId)
            .then(response => navigate("/plans"))
            .catch(err => console.log(err))
    }

    console.log("USER", user)

    console.log("AUTHOR",)

    return (<>
        <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="floatingTitle">Title</label>
            </div>
            <div className="form-floating">
                <MyCkEditor descriptionHandler={descriptionHandler} />
            </div>
            <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Add your image here</label>
                <input className="form-control" type="file" onChange={(e) => handleFileUpload(e)} id="formFile" name="images" />
            </div>
            <div className="mb-3">
                <Calendar onRangeChange={handleRangeChange} />
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingDestination" value={destination} onChange={(e) => setDestination(e.target.value)} />
                <label htmlFor="floatingDestination">Destination</label>
            </div>
            {<button className="btn btn-info" type="submit">Edit plan</button>}
            <Link to={`/plans/${planId}`}><button>Go back</button></Link>
            <button className="btn btn-danger" type="button" onClick={() => deleteHandler(planId)}>Delete plan</button>
        </form>
    </>)
}