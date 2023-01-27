import axios from 'axios';
import { useEffect, useState } from 'react';
import './FollowRec.css';
import './Post.css'

const FollowRec = (props) => {

    const [recommedations, setRecommedations] = useState([]);

    const getRecomandations = () => {
        axios.post("https://akademia108.pl/api/social-app/follows/recommendations")
            .then((res) => {
                setRecommedations(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    useEffect(() => { getRecomandations() }, [props.posts])


    const follow = (id) => {
        axios.post("https://akademia108.pl/api/social-app/follows/follow", {
            leader_id: id,
        })
            .then(() => {
                props.getLatestPost();

            })
            .catch((error) => {
                console.error(error)
            })
    }

    return <div className="followRec">
        {recommedations.map(recommedation => {
            return (<div className="folowRecom" key={recommedation.id}>
                <img src={recommedation.avatar_url} alt={recommedation.username} />
                <h3>{recommedation.username}</h3>
                <button className="btn" onClick={() => follow(recommedation.id)}>Follow</button>


            </div>)
        })}
    </div>

};
export default FollowRec;
