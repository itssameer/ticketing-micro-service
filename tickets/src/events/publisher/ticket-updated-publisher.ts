import {
  Subjects,
  Publisher,
  TicketUpdatedEvent,
} from "@microservice_poc/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  // readonly subject = Subjects.TicketUpdated

  // or

  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
