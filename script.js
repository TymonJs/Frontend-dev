function HelloJSX({title}){
    return (<h1>{title + "!!!"}</h1>);
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<HelloJSX title="root"/>)

const container = ReactDOM.createRoot(document.getElementById("container"))
container.render(<HelloJSX title="Witaj w JSX"/>)