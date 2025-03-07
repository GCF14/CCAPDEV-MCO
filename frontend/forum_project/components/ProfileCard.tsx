"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import EditPopUp from "./EditPopUp"
import AvatarUpload from "./EditProfileAvatar"

export interface ProfileInfo {
  username: string
  bio?: string
}

export default function ProfileCard({ username: initialUsername, bio: initialBio = "" }: ProfileInfo) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState("/profile-pic.jpg")
  const [username, setUsername] = useState(initialUsername)
  const [bio, setBio] = useState(initialBio)

  const handleProfileImageChange = (newImageUrl: string) => {
    setProfileImageUrl(newImageUrl)
    // Update this in the back alos
  }

  const handleProfileUpdate = (newUsername: string, newBio: string) => {
    setUsername(newUsername)
    setBio(newBio)
    // Update this in backend also
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="relative w-full h-32 bg-gray-400">
          <div className="absolute left-2 bottom-[-30px]">
            <AvatarUpload currentImageUrl={profileImageUrl} onImageChange={handleProfileImageChange} size="md" />
          </div>
        </div>
        <div className="pt-10">
          <CardTitle></CardTitle>
          <p className="font-semibold text-lg">{username}</p>
          <p>Following: 4 Followers: 5</p>
        </div>

        <CardDescription>Bio</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{bio || "No bio yet."}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <div>
          <button onClick={() => setIsPopupOpen(true)} className="bg-blue-500 text-white p-2 rounded">
            Edit Profile
          </button>

          <EditPopUp
            bool={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            currentUsername={username}
            currentBio={bio}
            onSave={handleProfileUpdate}
          />
        </div>
      </CardFooter>
    </Card>
  )
}

