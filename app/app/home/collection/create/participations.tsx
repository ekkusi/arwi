import { useCallback } from "react";
import StudentParticipationList, { StudentParticipation } from "../../../../components/StudentParticipationList";
import { useCollectionCreationContext } from "./CollectionCreationProvider";
import CollectionCreationLayout from "./_layout";

function CollectionParticipationsContent() {
  const { evaluations } = useCollectionCreationContext();

  const onParticipationsChanged = useCallback((newParticipations: StudentParticipation[]) => {
    console.log("Participations changed", newParticipations);
  }, []);

  return <StudentParticipationList initialParticipations={evaluations} onChange={onParticipationsChanged} />;
}

export default function CollectionParticipationsView() {
  return (
    <CollectionCreationLayout>
      <CollectionParticipationsContent />
    </CollectionCreationLayout>
  );
}
