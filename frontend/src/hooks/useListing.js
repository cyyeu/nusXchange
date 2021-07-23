import React, { useState, useEffect } from 'react'

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
      setListing(data)
      setLoading(false)
    }
    getListing()
  }, [id])

  return [loading, listing, setListing]
}

export default useListing
