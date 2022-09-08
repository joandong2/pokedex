import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Pokemon = ({ attributes }) => {

    return (
        <>
            <img src={attributes.sprites.other.dream_world.front_default} alt=""/>
            <h1 key={attributes.order}>{attributes.name}</h1>
        </>
    )
}

export default Pokemon