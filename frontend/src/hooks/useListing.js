import React, { useState, useEffect } from 'react'
import { Cloudinary } from '@cloudinary/base'
import { fill } from '@cloudinary/base/actions/resize'
import { max } from '@cloudinary/base/actions/roundCorners'
import { defaultImage } from '@cloudinary/base/actions/delivery'

const useListing = (id) => {
  const initListing = {
    id: 0,
    avg_rating: 0,
    owner: {
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
    },
    mod_code: '',
    description: '',
    date_created: '',
    avail_dates: [],
    price: 0,
  }
  const [listing, setListing] = useState(initListing)
  const [loading, setLoading] = useState(true)

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'nusxchange',
    },
  })

  useEffect(() => {
    async function getListing() {
      setLoading(true)
      const res = await fetch(`/api/listings/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data)
        return
      }
      const profile_img =
        data.owner.avatar_id === ''
          ? cld.image('default')
          : cld.image(data.owner.avatar_id)
      profile_img.delivery(defaultImage('default'))
      profile_img.resize(fill().width(150).height(150)).roundCorners(max())
      data.owner.profile_img = profile_img
      setListing(data)
      setLoading(false)
    }
    getListing()
  }, [id])

  return [loading, listing, setListing]
}

export default useListing
