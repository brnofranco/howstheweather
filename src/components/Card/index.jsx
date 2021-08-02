import './styles.sass';

export function Card({ text, value, type}) {
    return(
        <div className="card">
            <h3> {value}{type} </h3>
            <h4> {text} </h4>
        </div>
    );
}