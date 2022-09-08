const Pokemon = ({ attributes }) => {

    return (
        <div key={attributes.order} className={`pokemon flex flex-col ml-4 mt-4 p-2 mb-5 w-[20%] box-content h-80 align-center justify-between ${attributes.types[0].type.name}`}>
            <img className="mt-[-25px] ml-[-50px] max-h-[300px]" src={attributes.sprites.other.dream_world.front_default} alt=""/>
            <h1 >{attributes.name}</h1>
        </div>
    )
}

export default Pokemon