import React, { useState, useEffect } from 'react'
import { Cloudinary } from '@cloudinary/base'
import { fill } from '@cloudinary/base/actions/resize'
import { max } from '@cloudinary/base/actions/roundCorners'
import { defaultImage } from '@cloudinary/base/actions/delivery'

const useUser = (id) => {
  const initUser = {
    pk: 0,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    verified: false,
    bio: '',
    xp: 0,
    avatar_id: '',
    linkedin_url: '',
    tg_url: '',
  }
  const [user, setUser] = useState(initUser)
  const [loading, setLoading] = useState(true)

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'nusxchange',
    },
  })

  useEffect(() => {
    async function getUser() {
      setLoading(true)
      const res = await fetch(`/api/user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      console.log(data)
      if (!res.ok) {
        return
      }
      const profile_img =
        data.avatar_id === '' ? cld.image('default') : cld.image(data.avatar_id)
      profile_img.delivery(defaultImage('default'))
      profile_img.resize(fill().width(150).height(150)).roundCorners(max())
      setUser({ ...data, profile_img })
      console.log(user)

      setLoading(false)
    }
    getUser()
  }, [id])

  return [loading, user, setUser]
}

export default useUser
