import { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../lib/axiosInstance";

import type { TypeProfileProps } from "../../types";

import Box from "../../components/ui/Box";
import Avatar from "../../components/profile/Avatar";

import { useTimestamp } from "../../hooks/use-timestamp";

import { ClipLoader } from "react-spinners";
import { FaRegClock } from "react-icons/fa";

export default function Profile() {

    // HOOKS
    const { formatTimestamp } = useTimestamp()
    const { username } = useParams();
    const [ isPending, startTransition ] = useTransition()

    // STATES
    const [ formatLastOnline, setFormatLastOnline ] = useState<string>("")
    const [ profileData, setProfileData ] = useState<TypeProfileProps>({
        "@id": "",
        avatar: "",
        country: "",
        followers: null,
        is_streamer: false,
        joined: null,
        last_online: null,
        league: "",
        name: "",
        player_id: null,
        status: "",
        streaming_platforms: [],
        title: "",
        url: "",
        username: "",
        verified: ""
    })
    

    // FUNCTIONS
    const fetchPlayerProfile = () => {
        startTransition(async () => {
            await axiosInstance
                .get(`/pub/player/${username}`)
                .then(res => setProfileData(() => res?.data))
                .catch(err => console.error(err))
        })
    }

    // INITIALIZATION
    useEffect(() => {
        fetchPlayerProfile()
    }, [username])

    // FORMAT LAST ONLINE AND UPDATE EVERY SECOND
    useEffect(() => {

        const interval = setInterval(() => {
            setFormatLastOnline(() => formatTimestamp(profileData?.last_online ?? 0));
        }, 1000);

        return () => clearInterval(interval);

    }, [profileData.last_online]);

    if(isPending) {
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ClipLoader
                    loading={isPending}
                    size={200}
                    color="yellow"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    }

    return (
        <div>
            <div className="w-fit m-auto p-8">

                {/* PROFILE HEADER */}
                <Avatar imagePath={profileData.avatar } />
                <h1 className="text-lg text-center">{profileData.name}</h1>

                {/* SUMMARY LAST ONLINE/ACTIVE */}
                <div className="text-2xl m-auto w-fit mt-10 text-center">
                    <div className="flex items-center gap-2">
                        <FaRegClock/>
                        <p>Last Online:</p>
                    </div>
                    <p>{formatLastOnline}</p>
                </div>


                <hr className="my-8"></hr>

                {/* INFORMATION */}
                <div className="grid lg:grid-cols-2 gap-2">
                    <Box id="id" label="ID" >{profileData["@id"]}</Box>
                    <Box id="country" label="Country" >{profileData.country}</Box>
                    <Box id="followers" label="Followers" >{profileData.followers}</Box>
                    <Box id="is_streamer" label="Is Streamer?" >{profileData.is_streamer? "Yes": "No"}</Box>
                    <Box id="joined" label="Joined" >{profileData.joined}</Box>
                    <Box id="last_online" label="Last Online" >{profileData.last_online}</Box>
                    <Box id="league" label="League" >{profileData.league}</Box>
                    <Box id="name" label="Name" >{profileData.name}</Box>
                    <Box id="player_id" label="Player ID" >{profileData.player_id}</Box>
                    <Box id="status" label="Status" >{profileData.status}</Box>
                    <Box id="streaming_platforms" label="Streaming Platform">{profileData.streaming_platforms.join(", ")}</Box>
                    <Box id="title" label="Title">{profileData.title}</Box>
                    <Box id="url" label="URL">{profileData.url}</Box>
                    <Box id="username" label="Username">{profileData.username}</Box>
                    <Box id="verified" label="Verified">{profileData.verified}</Box>
                </div>
            

            </div>
        </div>
    )
}