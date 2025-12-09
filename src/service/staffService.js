import db from "../models";

const Staff = db.StaffService;

export const updateMyStaffProfile = (staff_id, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      // findOrCreate trả về [instance, created]
      const [profile, created] = await Staff.findOrCreate({
        where: { staff_id },
        defaults: { staff_id },
      });

      // Cập nhật các field
      profile.experience_years =
        payload.experience_years ?? profile.experience_years;
      profile.is_active = payload.is_active ?? profile.is_active;
      profile.store_name = payload.store_name ?? profile.store_name;
      profile.store_address = payload.store_address ?? profile.store_address;
      profile.store_lat = payload.store_lat ?? profile.store_lat;
      profile.store_lng = payload.store_lng ?? profile.store_lng;
      profile.bio = payload.bio ?? profile.bio;

      await profile.save();

      return resolve({
        err: 0,
        mes: "Staff profile updated successfully",
        profile,
      });
    } catch (error) {
      return reject(error);
    }
  });
};
