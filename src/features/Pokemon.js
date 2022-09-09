const Pokemon = ({ attributes }) => {
    return (
        <>
        <div data-bs-toggle="modal" data-bs-target={`#${attributes.name}`} key={attributes.order} className={`pokemon flex flex-col ml-4 mt-4 p-2 mb-5 w-[13%] rounded-md box-content h-60 align-center justify-center ${attributes.types[0].type.name} cursor-pointer`}>
            <img className="max-h-[200px]" src={attributes.sprites.other.dream_world.front_default} alt=""/>
        </div>
        <div className={`modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto modal-${attributes.types[0].type.name}`} id={`${attributes.name}`} tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current ">
                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                        <button type="button"
                        className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body relative p-4">
                        <div className="flex justify-between align-middle">
                            <img className="max-h-[300px]" src={`${attributes.sprites.other["official-artwork"].front_default}`} alt=""/>
                            <div>
                                <h1 className="text-lightBlack">{attributes.name}</h1>
                                <p className="text-lightBlack">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Pokemon