import React from 'react'
import { useParams } from 'react-router-dom';

export default function AlbumDetail() {
    const params = useParams();
    
    return (
        <div>AlbumDetail:{params.aid}</div>
    )
}
