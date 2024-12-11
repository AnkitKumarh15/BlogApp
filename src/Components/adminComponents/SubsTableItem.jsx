import React from 'react'
import Image from 'next/image'

function SubsTableItem({email, mongoID,deleteEmail, date}) {

    const emailDate = new Date(date);



  return (
    <tr className='bg-white border-b text-left'>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            {email?email:"No Email"}
        </th>
        <td className='px-6 py-4 hidden sm:block'>
            {emailDate.toDateString()}
        </td>
        <td onClick={()=>deleteEmail(mongoID)} className='px-6 py-4 cursor-pointer font-bold text-black'>
            x
        </td>
    </tr>
  )
}

export default SubsTableItem
