// PersonalInfo.tsx

import { useEffect, useState } from "react";
import { PROFILE_STRINGS, type PersonalData } from "./profileData.tsx";
import type { Address } from "./profileData.tsx";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const EMPTY_ADDRESS: Omit<Address, "id" | "isDefault"> = {
  fullName: "",
  phone: "",
  email: "",
  postalCode: "",
  city: "",
  state: "",
  nearbyLandmark: "",
};

const LineInput = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <input
    className="w-full bg-transparent border-0 border-b border-[#E4DDCB] pb-2 pt-1 text-[13px] text-[#402C1F] placeholder-[#C5B4A0] outline-none focus:border-[#402C1F] transition-colors"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default function PersonalInfo() {
  const { user, updateProfile, logout } = useUser();
  const navigate = useNavigate();
  
  // Initialize with user data or empty profile
  const [data, setData] = useState<PersonalData>(
    user
      ? {
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          addresses: user.addresses || [],
        }
      : {
          name: "",
          email: "",
          phoneNumber: "",
          addresses: [],
        }
  );
  
  const [editingInfo, setEditingInfo] = useState(false);
  const [infoForm, setInfoForm] = useState({
    name: data.name,
    phoneNumber: data.phoneNumber,
    email: data.email,
  });

  useEffect(() => {
    if (user) {
      const defaultAddr = user.addresses?.find((a) => a.isDefault) || user.addresses?.[0];
      const syncedPhone = defaultAddr ? defaultAddr.phone : "";

      const activeProfile = {
        name: user.name,
        email: user.email,
        phoneNumber: syncedPhone,
        addresses: user.addresses || [],
      };
      setData(activeProfile);
      setInfoForm({
        name: activeProfile.name,
        phoneNumber: activeProfile.phoneNumber,
        email: activeProfile.email,
      });
    }
  }, [user]);
  const [newAddress, setNewAddress] = useState({ ...EMPTY_ADDRESS });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [editAddressForm, setEditAddressForm] = useState<Omit<Address, "id" | "isDefault">>({ ...EMPTY_ADDRESS });

  const handleInfoSave = () => {
    const updatedProfile = {
      ...data,
      ...infoForm,
    };
    setData(updatedProfile);
    updateProfile({
      name: updatedProfile.name,
      phoneNumber: updatedProfile.phoneNumber,
      email: updatedProfile.email,
    });
    setEditingInfo(false);
  };

  const handleAddAddress = () => {
    if (!newAddress.fullName) return;
    setData((prev) => {
      const nextAddresses = [
        ...prev.addresses,
        {
          ...newAddress,
          id: Date.now(),
          isDefault: prev.addresses.length === 0,
        },
      ];
      const newDefault = nextAddresses.find(a => a.isDefault) || nextAddresses[0];
      const newPhone = newDefault ? newDefault.phone : "";

      const next = {
        ...prev,
        addresses: nextAddresses,
        phoneNumber: newPhone,
      };

      updateProfile({
        addresses: next.addresses,
        phoneNumber: newPhone,
      });
      return next;
    });
    setNewAddress({ ...EMPTY_ADDRESS });
    setShowAddForm(false);
  };

  const handleSaveEditAddress = (id: number) => {
    if (!editAddressForm.fullName) return;
    setData((prev) => {
      const nextAddresses = prev.addresses.map((a) =>
        a.id === id ? { ...a, ...editAddressForm } : a
      );
      const newDefault = nextAddresses.find(a => a.isDefault) || nextAddresses[0];
      const newPhone = newDefault ? newDefault.phone : "";

      const next = {
        ...prev,
        addresses: nextAddresses,
        phoneNumber: newPhone,
      };
      updateProfile({
        addresses: next.addresses,
        phoneNumber: newPhone,
      });
      return next;
    });
    setEditingAddressId(null);
  };

  const handleDelete = (id: number) => {
    setData((prev) => {
      const nextAddresses = prev.addresses.filter((a) => a.id !== id);
      // If the deleted address was default, set the next one as default
      const wasDefault = prev.addresses.find(a => a.id === id)?.isDefault;
      if (wasDefault && nextAddresses.length > 0) {
        nextAddresses[0].isDefault = true;
      }
      
      const newDefault = nextAddresses.find(a => a.isDefault) || nextAddresses[0];
      const newPhone = newDefault ? newDefault.phone : "";

      const next = {
        ...prev,
        addresses: nextAddresses,
        phoneNumber: newPhone,
      };
      updateProfile({
        addresses: next.addresses,
        phoneNumber: newPhone,
      });
      return next;
    });
  };

  const handleSetDefault = (id: number) => {
    setData((prev) => {
      const nextAddresses = prev.addresses.map((a) => ({ ...a, isDefault: a.id === id }));
      const newDefault = nextAddresses.find(a => a.id === id);
      const newPhone = newDefault ? newDefault.phone : "";

      const next = {
        ...prev,
        addresses: nextAddresses,
        phoneNumber: newPhone,
      };
      updateProfile({
        addresses: next.addresses,
        phoneNumber: newPhone,
      });
      return next;
    });
  };

  const formatAddress = (a: Address) =>
    `${a.fullName} , ${a.phone} ,${a.postalCode}, ${a.state} , ${a.city} , ${a.nearbyLandmark}`;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-editorial text-[24px] font-semibold tracking-wide text-[#402C1F] m-0">
          {PROFILE_STRINGS.sectionTitle}
        </h2>
        {!editingInfo && (
          <button
            className="text-[12px] text-[#402C1F] underline underline-offset-2 bg-none border-none cursor-pointer p-0 hover:opacity-70 transition-opacity"
            onClick={() => setEditingInfo(true)}
          >
            {PROFILE_STRINGS.editInfo}
          </button>
        )}
      </div>

      {/* Personal Fields */}
      {editingInfo ? (
        <div className="flex flex-col gap-3 mb-4">
          {(["name", "phoneNumber", "email"] as const).map((field) => (
            <div
              key={field}
              className="flex flex-col gap-1 border-b border-[#E4DDCB] pb-3"
            >
              <label className="text-[12px] text-[#C5B4A0]">
                {field === "name"
                  ? PROFILE_STRINGS.labelName
                  : field === "phoneNumber"
                  ? PROFILE_STRINGS.labelPhone
                  : PROFILE_STRINGS.labelEmail}
              </label>
              <LineInput
                placeholder=""
                value={infoForm[field]}
                onChange={(v) =>
                  setInfoForm((prev) => ({ ...prev, [field]: v }))
                }
              />
            </div>
          ))}
          <div className="flex gap-3 mt-2">
            <button
              className="bg-[#402C1F] text-white text-[13px] tracking-widest px-6 py-2 border-none cursor-pointer hover:opacity-85 transition-opacity"
              onClick={handleInfoSave}
            >
              Save
            </button>
            <button
              className="bg-transparent text-[#402C1F] text-[13px] border-none cursor-pointer underline underline-offset-2 px-4 py-2 hover:opacity-70 transition-opacity"
              onClick={() => setEditingInfo(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {[
            { label: PROFILE_STRINGS.labelName, value: data.name },
            { label: PROFILE_STRINGS.labelPhone, value: data.phoneNumber },
            { label: PROFILE_STRINGS.labelEmail, value: data.email },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-3 border-b border-[#E4DDCB]"
            >
              <span className="text-[13px] text-[#402C1F]">{label}</span>
              <span className="text-[13px] text-[#C5B4A0] text-right">
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Addresses */}
      {data.addresses.length === 0 && (
        <div className="mt-5 pt-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[13px] text-[#402C1F]">
              {PROFILE_STRINGS.labelAddress}
            </span>
            <button
              className="text-[12px] text-[#402C1F] underline underline-offset-2 bg-none border-none cursor-pointer p-0 hover:opacity-70 transition-opacity"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {PROFILE_STRINGS.addAddress}
            </button>
          </div>
          <div className="flex justify-start py-2 border-b border-[#E4DDCB]">
            <span className="text-[13px] text-[#C5B4A0]">
              No saved addresses.
            </span>
          </div>
        </div>
      )}

      {data.addresses.map((addr, i) => (
        <div key={addr.id} className="mt-5 pt-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[13px] text-[#402C1F]">
              {PROFILE_STRINGS.labelAddress} {i + 1}
            </span>
            {i === data.addresses.length - 1 && (
              <button
                className="text-[12px] text-[#402C1F] underline underline-offset-2 bg-none border-none cursor-pointer p-0 hover:opacity-70 transition-opacity"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {PROFILE_STRINGS.addAddress}
              </button>
            )}
          </div>
          {editingAddressId === addr.id ? (
            <div className="mt-3">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-3">
                <LineInput
                  placeholder={PROFILE_STRINGS.phFullName}
                  value={editAddressForm.fullName}
                  onChange={(v) => setEditAddressForm((p) => ({ ...p, fullName: v }))}
                />
                <LineInput
                  placeholder={PROFILE_STRINGS.phNumber}
                  value={editAddressForm.phone}
                  onChange={(v) => setEditAddressForm((p) => ({ ...p, phone: v }))}
                />
                <LineInput
                  placeholder={PROFILE_STRINGS.phEmail}
                  value={editAddressForm.email}
                  onChange={(v) => setEditAddressForm((p) => ({ ...p, email: v }))}
                />
                <LineInput
                  placeholder={PROFILE_STRINGS.phPostalCode}
                  value={editAddressForm.postalCode}
                  onChange={(v) => setEditAddressForm((p) => ({ ...p, postalCode: v }))}
                />
                <LineInput
                  placeholder={PROFILE_STRINGS.phCity}
                  value={editAddressForm.city}
                  onChange={(v) => setEditAddressForm((p) => ({ ...p, city: v }))}
                />
                <LineInput
                  placeholder={PROFILE_STRINGS.phState}
                  value={editAddressForm.state}
                  onChange={(v) => setEditAddressForm((p) => ({ ...p, state: v }))}
                />
              </div>
              <LineInput
                placeholder={PROFILE_STRINGS.phLandmark}
                value={editAddressForm.nearbyLandmark}
                onChange={(v) => setEditAddressForm((p) => ({ ...p, nearbyLandmark: v }))}
              />
              <div className="flex gap-3 mt-4">
                <button
                  className="bg-[#402C1F] text-white text-[13px] tracking-widest px-6 py-2 border-none cursor-pointer hover:opacity-85 transition-opacity"
                  onClick={() => handleSaveEditAddress(addr.id)}
                >
                  Save Changes
                </button>
                <button
                  className="bg-transparent text-[#402C1F] text-[13px] border-none cursor-pointer underline underline-offset-2 px-4 py-2 hover:opacity-70 transition-opacity"
                  onClick={() => setEditingAddressId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-end py-2 border-b border-[#E4DDCB]">
                <span className="text-[13px] text-[#C5B4A0] text-right">
                  {formatAddress(addr)}
                </span>
              </div>
              <div className="flex items-center mt-1 gap-0">
                {addr.isDefault ? (
                  <span className="text-[11px] font-semibold text-[#8B6F47]">
                    Default
                  </span>
                ) : (
                  <button
                    className="text-[11px] text-[#C5B4A0] bg-none border-none cursor-pointer p-0 hover:text-[#402C1F] transition-colors"
                    onClick={() => handleSetDefault(addr.id)}
                  >
                    Set as Default
                  </button>
                )}
                <span className="text-[11px] text-[#C5B4A0] mx-1"> / </span>
                <button
                  className="text-[11px] text-[#C5B4A0] bg-none border-none cursor-pointer p-0 hover:text-[#402C1F] transition-colors"
                  onClick={() => handleDelete(addr.id)}
                >
                  {PROFILE_STRINGS.deleteAddress}
                </button>
                <span className="text-[11px] text-[#C5B4A0] mx-1"> / </span>
                <button
                  className="text-[11px] font-semibold text-[#402C1F] bg-none border-none cursor-pointer p-0 hover:opacity-70"
                  onClick={() => {
                    setEditingAddressId(addr.id);
                    setEditAddressForm({
                      fullName: addr.fullName,
                      phone: addr.phone,
                      email: addr.email,
                      postalCode: addr.postalCode,
                      city: addr.city,
                      state: addr.state,
                      nearbyLandmark: addr.nearbyLandmark,
                    });
                  }}
                >
                  {PROFILE_STRINGS.editAddress}
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Add Address Form */}
      {showAddForm && (
        <div className="mt-5 pt-1">
          <div className="mb-3">
            <span className="text-[13px] text-[#402C1F]">
              {PROFILE_STRINGS.labelAddress} {data.addresses.length + 1}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-3">
            <LineInput
              placeholder={PROFILE_STRINGS.phFullName}
              value={newAddress.fullName}
              onChange={(v) => setNewAddress((p) => ({ ...p, fullName: v }))}
            />
            <LineInput
              placeholder={PROFILE_STRINGS.phNumber}
              value={newAddress.phone}
              onChange={(v) => setNewAddress((p) => ({ ...p, phone: v }))}
            />
            <LineInput
              placeholder={PROFILE_STRINGS.phEmail}
              value={newAddress.email}
              onChange={(v) => setNewAddress((p) => ({ ...p, email: v }))}
            />
            <LineInput
              placeholder={PROFILE_STRINGS.phPostalCode}
              value={newAddress.postalCode}
              onChange={(v) => setNewAddress((p) => ({ ...p, postalCode: v }))}
            />
            <LineInput
              placeholder={PROFILE_STRINGS.phCity}
              value={newAddress.city}
              onChange={(v) => setNewAddress((p) => ({ ...p, city: v }))}
            />
            <LineInput
              placeholder={PROFILE_STRINGS.phState}
              value={newAddress.state}
              onChange={(v) => setNewAddress((p) => ({ ...p, state: v }))}
            />
          </div>
          <LineInput
            placeholder={PROFILE_STRINGS.phLandmark}
            value={newAddress.nearbyLandmark}
            onChange={(v) =>
              setNewAddress((p) => ({ ...p, nearbyLandmark: v }))
            }
          />
          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 accent-[#402C1F]"
            />
            <span className="text-[12px] text-[#C5B4A0]">
              {PROFILE_STRINGS.setDefault}
            </span>
          </label>
          <div className="flex gap-3 mt-4">
            <button
              className="bg-[#402C1F] text-white text-[13px] tracking-widest px-6 py-2 border-none cursor-pointer hover:opacity-85 transition-opacity"
              onClick={handleAddAddress}
            >
              Save Address
            </button>
            <button
              className="bg-transparent text-[#402C1F] text-[13px] border-none cursor-pointer underline underline-offset-2 px-4 py-2 hover:opacity-70 transition-opacity"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <button
        className="bg-[#402C1F] text-white text-[13px] tracking-widest px-6 py-2.5 border-none cursor-pointer hover:opacity-85 transition-opacity"
        onClick={() => {
          logout();
          setEditingInfo(false);
          navigate("/login");
        }}
      >
        {PROFILE_STRINGS.btnLogout}
      </button>
      <button className="bg-transparent text-[#402C1F] text-[13px] border-none cursor-pointer underline underline-offset-2 px-4 py-2.5 hover:opacity-70 transition-opacity">
        {PROFILE_STRINGS.btnChangePassword}
      </button>
      </div>
    </div>
  );
}