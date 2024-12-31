import "../styles/components/titleLabe.css"

function titleLabe(props) {
    return (
        <div className="cover">
            <label className="label">{props.title}</label>
        </div>
    );
}

export default titleLabe;