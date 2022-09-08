const Pokemon = ({ attributes }) => {

    return (
        <div key={attributes.order} className={`pokemon flex flex-col ml-4 mt-4 p-2 mb-5 w-[13%] rounded-md box-content h-60 align-center justify-between ${attributes.types[0].type.name}`}>
            <img className="mt-[-15px] ml-[-30px] max-h-[200px]" src={attributes.sprites.other.dream_world.front_default} alt=""/>
            <h1 >{attributes.name}</h1>
        </div>
    )
}

export default Pokemon